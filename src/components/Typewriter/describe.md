### 打字机组件

使用纯 js 加 css 实现的一个打字机组件

#### 使用

```javascript
import Typewriter from '@/components/Typewriter';

interface Props {
  data: string; // 当前显示的文字
  startTime: number; // 开始打字间隔时间
  endTime: number; // 清除打字间隔时间
  typewriterStyle?: CSSProperties; // 盒子样式
  textBoxStyle?: CSSProperties; // 文字样式
}

<Typewriter
  data={
    '今天终于把博客搭建上了，增加了公路旅人这个功能，可以把自己拍摄的照片和喜欢的照片上传上去了'
  }
  startTime={300}
  endTime={100}
  textBoxStyle={{ color: '#fff' }}
/>;
```
