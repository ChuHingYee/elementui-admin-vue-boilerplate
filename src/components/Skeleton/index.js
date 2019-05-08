import './index.scss';
export default {
  functional: true,
  name: 'Skeleton',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: true
    },
    title: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: true
    },
    paragraph: {
      type: Array,
      default: () => [10, 10, [5, 5, 3], 10, 10]
    }
  },
  render (h, context) {
    const { loading, avatar, title, paragraph, active } = context.props;
    return (
      <div style="width:100%;height:100%;">
        {loading ? (
          <div class="skeleton">
            {avatar && (
              <div class="skeleton-ava">
                <span
                  class={{
                    'skeleton-ava-img': true,
                    'skeleton-active': active
                  }}
                />
              </div>
            )}
            <div class="skeleton-main">
              {title && (
                <h3
                  class={{
                    'skeleton-line': true,
                    'skeleton-title': true,
                    'skeleton-active': active
                  }}
                />
              )}
              {paragraph.map((item, index) => {
                const type = Object.prototype.toString.call(item);
                if (type === '[object Number]') {
                  return (
                    <div
                      class={{
                        'skeleton-main-line': true,
                        'skeleton-line': true,
                        'skeleton-active': active
                      }}
                      key={index}
                      style={{ width: `${item * 10}%` }}
                    />
                  );
                } else if (type === '[object Array]') {
                  return (
                    <div
                      class={{
                        'skeleton-main-line': true,
                        'skeleton-main-mline': true
                      }}
                      key={index}
                    >
                      {item.map((c, index) => {
                        if (
                          Object.prototype.toString.call(c) ===
                          '[object Number]'
                        ) {
                          return (
                            <div
                              key={`c${c}${index}`}
                              class={{
                                'skeleton-line': true,
                                'skeleton-active': active
                              }}
                              style={{ width: `${c * 10}%` }}
                            />
                          );
                        }
                      })}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          context.children
        )}
      </div>
    );
  }
};
