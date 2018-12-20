import { youtubeUrl } from "./videoHelpers/youtube";
import getVideoId from 'get-video-id';
import { twitchIdProcessor } from "./videoHelpers/twitch";
import { IVideoService, IVideoId } from "./interfaces";

export const defaultOptions = {
    width: 560,
    ratio: 1.77,
    related: false,
    noIframeBorder: true
}

export const videoServicesConfig: IVideoService[] = [
    {
        id: 'youtube',
        embedUrl: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
        urlProcessing: youtubeUrl
    },
    {
        id: 'vimeo',
        embedUrl: (videoId: string) => `https://player.vimeo.com/video/${videoId}`
    },
    {
        id: 'videopress',
        embedUrl: (videoId: string) => `https://videopress.com/embed/${videoId}`,
        additionalHTML: '<script src="https://videopress.com/videopress-iframe.js"></script>'
    },
    {
        id: 'twitch',
        embedUrl: (videoId: string) => `https://player.twitch.tv/?autoplay=false&video=${videoId}`
    },
    {
        id: 'twitchlive',
        embedUrl: (videoId: string) => `https://player.twitch.tv/?channel=${videoId}`
    }
];



export const videoIdProcessors: ((id: string) => IVideoId | {})[] = [
    getVideoId,
    twitchIdProcessor
];

export const knownPlatforms = () => {
    return videoServicesConfig.map(val => val.id);
}

export const getVideoService = (service: string) => {
    const foundService = videoServicesConfig.find(val => val.id === service);
    if (foundService) {
        return foundService;
    } else {
        throw Error("VideoService could not be found")
    }
}