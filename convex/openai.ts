import { action } from "./_generated/server";
import { v } from "convex/values";
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { Readable } from 'stream';

ffmpeg.setFfmpegPath(ffmpegPath!);

const HUGGING_FACE_API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { input }) => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech',
        { inputs: input },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            Accept: 'audio/wav',
          },
          responseType: 'arraybuffer',
        }
      );

      const wavBuffer = Buffer.from(response.data);

      const mp3Buffer = await new Promise<Buffer>((resolve, reject) => {
        const stream = Readable.from(wavBuffer);
        const chunks: Buffer[] = [];

        const ffmpegProcess = ffmpeg(stream)
          .inputFormat('wav')
          .format('mp3')
          .on('error', (err: Error) => reject(err));

        ffmpegProcess.pipe().on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        ffmpegProcess.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        ffmpegProcess.run();
      });

      return mp3Buffer;
    } catch (error) {
      console.error("Error during TTS or conversion process:", error);
      throw new Error("Failed to generate audio");
    }
  },
});
