const TagArticles = require('./tag_articles')
const Users = require('./user')
const Articles = require('./articles')
const Drafts = require('./draft')
const FriendlyLinks = require('./friendly_links')
const Tags = require('./tags')
const Comments = require('./comments')

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

