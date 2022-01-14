### 项目全局背景组件

此组件已放置到全局页面中，故而不需要再额外引用

#### 使用方法（Function）

```javascript
import { setBg } from '@/utils/utils';

// 初始化
useEffect(() => {
  setBg(true); // 设置为true是使用全局背景
}, []);
```
