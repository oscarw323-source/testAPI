const videoQueryRepo = {
  getVideos(): VideoOutputModel[] {
    const dbVideo: DBVideo[] = [];
    const authors: DBAuthor[] = [];

    return dbVideo.map((dbVideo) => {
      const author = authors.find((a) => a._id === dbVideo.authorId);

      return this._mapDBVideoToOutputModel(dbVideo, author!);
    });
  },

  getVideoById(id: string): VideoOutputModel {
    const dbVideo: DBVideo = {
      _id: 123,
      title: "Samurai Video",
      authorId: "329876",
      isBanned: false,
      banObject: null,
    };

    const author: DBAuthor = {
      _id: "329876",
      firstName: "Taras",
      lastName: "Obriadin",
    };

    return this._mapDBVideoToOutputModel(dbVideo, author);
  },
  getBannedVideos(id: string): BannedVideoOutputModel[] {
    const dbVideo: DBVideo[] = [];
    const authors: DBAuthor[] = [];

    return dbVideo.map((dbVideo) => {
      const dbAuthor = authors.find((a) => a._id === dbVideo.authorId);

      return {
        id: dbVideo._id,
        title: dbVideo.title,
        author: {
          id: dbAuthor!._id,
          name: dbAuthor!.firstName + " " + dbAuthor!.lastName,
        },
        banReason: dbVideo.banObject!.banReason,
      };
    });
  },

  _mapDBVideoToOutputModel(dbVideo: DBVideo, dbAuthor: DBAuthor) {
    return {
      id: dbVideo._id,
      title: dbVideo.title,
      author: {
        id: dbAuthor._id,
        name: dbAuthor.firstName + " " + dbAuthor.lastName,
      },
    };
  },
};

type DBVideo = {
  _id: number;
  title: string;
  authorId: string;
  isBanned: boolean;
  banObject: null | {
    isBanned: boolean;
    banReason: string;
  };
};

type DBAuthor = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type VideoOutputModel = {
  id: number;
  title: string;
  author: {
    id: string;
    name: string;
  };
};

export type BannedVideoOutputModel = {
  id: number;
  title: string;
  author: {
    id: string;
    name: string;
  };
  banReason: string;
};
