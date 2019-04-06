import user from './modelOprate/user'
import article from './modelOprate/article'
import tag from './modelOprate/tag'
import friendlyLink from './modelOprate/friendlyLink'
import draft from './modelOprate/draft'
import comment from './modelOprate/comment'

module.exports = {
  blogInit: user.blogInit,
  userInit: user.userInit,
  getEmail: user.getEmail,
  getAccountPwd: user.getAccountPwd,
  updateAboutMe: user.updateAboutMe,
  getAboutMe: user.getAboutMe,
  getArticle: article.getArticle,
  publicArticle: article.publicArticle,
  deleteArticle: article.deleteArticle,
  getArchive: article.getArchive,
  getArticleDetail: article.getArticleDetail,
  addTag: tag.addTag,
  getTags: tag.getTags,
  getTagDetail: tag.getTagDetail,
  deleteTag: tag.deleteTag,
  updateTag: tag.updateTag,
  getTagArticles: tag.getTagArticles,
  getFriendlyLinks: friendlyLink.getFriendlyLinks,
  addFriendlyLink: friendlyLink.addFriendlyLink,
  deleteFriendlyLink: friendlyLink.deleteFriendlyLink,
  updateFriendlyLink: friendlyLink.updateFriendlyLink,
  saveDraft: draft.saveDraft,
  getDraftList: draft.getDraftList,
  getDraft: draft.getDraft,
  deleteDraft: draft.deleteDraft,
  getComments: comment.getComments,
  deleteComment: comment.deleteComment,
  publicComment: comment.publicComment
}

