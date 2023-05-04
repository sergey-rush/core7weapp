export default {
    getChannelUrl: (item) => {
        let path = process.env.REACT_APP_CHANNEL_FOLDER + "/" + item.channelImage;
        return path
    },

};