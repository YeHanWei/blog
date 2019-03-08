const TagArticles = require('./models/tag_articles')
const Users = require('./models/user')
const Articles = require('./models/articles')
const Drafts = require('./models/draft')
const FriendlyLinks = require('./models/friendly_links')
const Tags = require('./models/tags')
const Comments = require('./models/comments')

module.exports = {
  Users: Users,
  Articles: Articles,
  Draft: Drafts,
  FriendlyLinks: FriendlyLinks,
  Tags: Tags,
  Comments: Comments,
  TagArticles: TagArticles
}

module.exports.sync = () => {
  return new Promise((resolve, reject) => {
    Users.sync().then(() => {
      Articles.sync().then(() => {
        Drafts.sync().then(() => {
          FriendlyLinks.sync().then(() => {
            Tags.sync().then(() => {
              TagArticles.sync().then(() => {
                Comments.sync().then(() => {
                  let iserr = false
                  resolve(iserr)
                }).catch(() => {
                  let iserr = true;
                  reject(iserr)
                });
              }).catch(() => {
                let iserr = true;
                reject(iserr)
              });
            }).catch(() => {
              let iserr = true;
              reject(iserr)
            });
          }).catch(() => {
            let iserr = true;
            reject(iserr)
          });
        }).catch(() => {
          let iserr = true;
          reject(iserr)
        });
      }).catch(() => {
        let iserr = true;
        reject(iserr)
      });
    }).catch(() => {
      let iserr = true;
      reject(iserr)
    });
  })
};

