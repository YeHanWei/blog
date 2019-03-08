import user from './user'
import article from './article'
import tag from './tag'
import friendlyLink from './friendlyLink'
import draft from './draft'
import comment from './comment'

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

