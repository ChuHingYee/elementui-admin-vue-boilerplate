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
      default: () => [10, 10, 10, 10]
    }
  },
  render (h, context) {
    const { loading, avatar, title, paragraph, active } = context.props;
    return (
      <div class='skeleton'>
        {loading ? (
          <div
            class={{
              'skeleton-container': true,
              'skeleton-active': active
            }}
          >
            {avatar && (
              <div class='skeleton-container__ava'>
                <span class='ava-pic' />
              </div>
            )}
            <div class='skeleton-container__main'>
              {title && (
                <h3
                  class={{
                    'main-line': true,
                    'main-title': true
                  }}
                />
              )}
              {paragraph.map((item, index) => {
                const type = Object.prototype.toString.call(item);
                if (type === '[object Number]') {
                  return (
                    <div
                      class='main-line'
                      key={index}
                      style={{ width: `${item * 10}%` }}
                    />
                  );
                } else if (type === '[object Array]') {
                  return (
                    <div class='main-mline' key={index}>
                      {item.map((c, index) => {
                        if (
                          Object.prototype.toString.call(c) ===
                          '[object Number]'
                        ) {
                          return (
                            <div
                              key={`c${c}${index}`}
                              class='mline-item'
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
