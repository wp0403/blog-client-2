/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-24 10:00:56
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-21 11:23:03
 */
import React, { useEffect, CSSProperties } from 'react';
import { useSetState } from 'ahooks';
import style from './index.less';

interface Props {
  data: string; // 当前显示的文字
  startTime: number; // 开始打字间隔时间
  endTime: number; // 清除打字间隔时间
  typewriterStyle?: CSSProperties; // 盒子样式
  textBoxStyle?: CSSProperties; // 文字样式
}

interface State {
  textArr: string; //全部文字的数组
  i: number; //当前文字项
  timerId: undefined | any; //定时器id
  flag: boolean; //控制文字加减
}

const Typewriter = (props: Props) => {
  const { data, startTime, endTime, textBoxStyle, typewriterStyle } = props;

  const [state, setState] = useSetState<State>({
    textArr: '',
    i: 0,
    timerId: undefined,
    flag: true,
  });

  // 执行打字程序
  const setTimer = () => {
    // 判断是否有正在执行的定时器，有则清除
    state.timerId && clearTimeout(state.timerId);

    if (state.flag) {
      setState({
        timerId: setTimeout(() => {
          if (state.i < state.textArr.length) {
            setState({
              i: (state.i += 1),
            });
          } else {
            setState({
              flag: false,
            });
          }
        }, startTime),
      });
    } else {
      setState({
        timerId: setTimeout(() => {
          if (state.i > 0) {
            setState({
              i: (state.i -= 1),
            });
          } else {
            setState({
              flag: true,
            });
          }
        }, endTime),
      });
    }
  };

  // 初始化数据
  const initData = () => {
    // 判断是否有正在执行的定时器，有则清除
    state.timerId && clearTimeout(state.timerId);
    // 初始化数据
    setState({
      textArr: data ? data : '请传入一段文字！',
      i: 0,
      timerId: undefined,
      flag: true,
    });
  };

  useEffect(() => {
    initData();
  }, [data, startTime, endTime]);

  useEffect(() => {
    setTimer();

    return () => {
      // 判断是否有正在执行的定时器，有则清除
      state.timerId && clearTimeout(state.timerId);
    };
  }, [state.textArr, state.flag, state.i]);

  return (
    <div className={style.text_input} style={typewriterStyle}>
      <span className={style.text_box} style={textBoxStyle}>
        {state.textArr.substring(0, state.i)}
        <span className={style.text_focus} />
      </span>
    </div>
  );
};

export default Typewriter;
