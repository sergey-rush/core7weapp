export default {
    getSnapshotUrl: (item) => {
        let path = process.env.REACT_APP_SNAPSHOT_FOLDER + "/" + item.channelUid + "/" + item.recordUid + "/" + item.cover;
        return path
    },

};