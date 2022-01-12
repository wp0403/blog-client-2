/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-12 11:41:15
 */
import React from 'react';
import { stringReplace } from '@/utils/dataUtils';
import styles from './index.less';

const AboutMe = () => {
  const str =
    '我曾经七次鄙视自己的灵魂\n第一次，当它本可进取时，却故作谦卑；\n第二次，当它在空虚时，用爱欲来填充；\n第三次，在困难和容易之间，它选择了容易；\n第四次，它犯了错，却借由别人也会犯错来宽慰自己；\n第五次，它自由软弱，却把它认为是生命的坚韧；\n第六次，当它鄙夷一张丑恶的嘴脸时，却不知那正是自己面具中的一副；\n第七次，它侧身于生活的污泥中，虽不甘心，却又畏首畏尾。\n我曾经七次鄙视自己的灵魂\n第一次，当它本可进取时，却故作谦卑；\n第二次，当它在空虚时，用爱欲来填充；\n第三次，在困难和容易之间，它选择了容易；\n第四次，它犯了错，却借由别人也会犯错来宽慰自己；\n第五次，它自由软弱，却把它认为是生命的坚韧；\n第六次，当它鄙夷一张丑恶的嘴脸时，却不知那正是自己面具中的一副；\n第七次，它侧身于生活的污泥中，虽不甘心，却又畏首畏尾。\n我曾经七次鄙视自己的灵魂\n第一次，当它本可进取时，却故作谦卑；\n第二次，当它在空虚时，用爱欲来填充；\n第三次，在困难和容易之间，它选择了容易；\n第四次，它犯了错，却借由别人也会犯错来宽慰自己；\n第五次，它自由软弱，却把它认为是生命的坚韧；\n第六次，当它鄙夷一张丑恶的嘴脸时，却不知那正是自己面具中的一副；\n第七次，它侧身于生活的污泥中，虽不甘心，却又畏首畏尾。';
  return (
    <div className={styles.about_me}>
      <div className={styles.title}>关于我</div>
      <div className={styles.border} />
      <div className={styles.tags}>
        <span>进取</span>
        <span>谦卑</span>
        <span>坚韧</span>
        <span>畏首畏尾</span>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: str ? stringReplace(str) : '',
        }}
      />
      <div className={styles.mask} />
    </div>
  );
};

export default AboutMe;
