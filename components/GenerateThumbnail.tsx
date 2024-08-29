import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const GenerateThumbnail = () => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const cn = (base: string, conditions: Record<string, boolean>) => {
    return [base, ...Object.keys(conditions).filter(key => conditions[key])].join(' ');
  };

  return (
    <div className='generate_thumbnail'>
      <Button
        type='button'
        variant="plain"
        onClick={() => setIsAiThumbnail(true)}
        className={cn('', {
          'bg-black-6': isAiThumbnail
        })}
      >
        Use AI to generate thumbnail
      </Button>
      <Button
        type='button'
        variant="plain"
        onClick={() => setIsAiThumbnail(false)}
        className={cn('', {
          'bg-black-6': !isAiThumbnail
        })}
      >
        Upload custom image
      </Button>
    </div>
    // {isAiThumbnail ? (
    //     <div>
    //     <div className="flex flex-col gap-2.5">
    //     <Label className="text-16 font-bold text-white-1">
    //       AI Prompt to generate Podcast
    //     </Label>
    //     <Textarea 
    //       className="input-class font-light focus-visible:ring-offset-orange-1"
    //       placeholder='Provide text to generate audio'
    //       rows={5}
    //       value={props.voicePrompt}
    //       onChange={(e) => props.setVoicePrompt(e.target.value)}
    //     />
    //   </div>
    //   <div className="mt-5 w-full max-w-[200px]">
    //     <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
    //       {isGenerating ? (
    //         <>
    //           Generating
    //           <Loader size={20} className="animate-spin ml-2" />
    //         </>
    //       ) : (
    //         'Generate'
    //       )}
    //     </Button>
    //   </div>
    //     </div>
    // ): (
    //   <div>
    //   </div>
    // )}
  );
};

export default GenerateThumbnail;
