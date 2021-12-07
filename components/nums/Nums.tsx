import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import {useEffect, useRef, useState} from "react";

export const Nums = () => {
  const changeTimes = useRef(1);
  const [times, setTimes] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entry, observer) => {
      entry.forEach(value => {
        if (value.isIntersecting) {
          console.log('visible')
          setTimes(prevState => {
            if (prevState === 1) {
              observer.disconnect();
              return 2;
            } else {
              return prevState + 1
            }
          });
        }
      })
    }, {threshold: 0.5})
    obs.observe(countRef.current);
  }, [])

  return (
    <div className={'w-full h-80 relative flex-center'}>
      <img draggable={false} src={process.env.NEXT_PUBLIC_PREFIX_IMG + "/img/num-bg.png"}
           className={'absolute w-full h-full z-0'}/>

      <div className={'w-300 h-full flex justify-between items-center'}>
        {numData.map(value =>
          <div ref={countRef} key={value.id} className={'select-none z-10'}>
            <div> {times === 0 && <span className={'text-title text-bang select-none font-semibold'}>1</span>}
              {times === 1 &&
              <CountUp className={'text-title text-bang select-none font-semibold'}
                       end={value.num} delay={0}
                       start={1}
                       duration={value.duration || 2}/>}
              {times > 1 &&
              <span className={'text-title text-bang select-none font-semibold'}>{value.num}</span>}
              <span className={'pl-4 text-bang font-bold select-none text-2xl'}>{value.unit}</span></div>
            <p className={'text-cfgray select-none pt-4 ml-2'}>{value.des}</p>
          </div>)}
      </div>
      {/*<VisibilitySensor offset={{top: 50}} onChange={() => {*/}
      {/*  changeTimes.current++;*/}
      {/*  console.log(changeTimes.current)*/}
      {/*}}>*/}
      {/*  {({isVisible}) =>*/}
      {/*    <div className={'w-300 h-full flex justify-between items-center'}>*/}
      {/*      {numData.map(value =>*/}
      {/*        <div key={value.id} className={'select-none z-10'}>*/}
      {/*          <div>{isVisible && changeTimes.current === 2 ?*/}
      {/*            <CountUp className={'text-title text-bang select-none font-semibold'}*/}
      {/*                     end={value.num} delay={0}*/}
      {/*                     start={1}*/}
      {/*                     duration={value.duration || 2}/>*/}
      {/*            : changeTimes.current >= 2 ?*/}
      {/*              <span className={'text-title text-bang select-none font-semibold'}>*/}
      {/*                {value.num}</span>*/}
      {/*              : <span className={'text-title text-bang select-none font-semibold'}>1</span>}*/}
      {/*            <span className={'pl-4 text-bang font-bold select-none text-2xl'}>{value.unit}</span></div>*/}
      {/*          <p className={'text-cfgray select-none pt-4 ml-2'}>{value.des}</p>*/}
      {/*        </div>)}*/}
      {/*    </div>}*/}
      {/*</VisibilitySensor>*/}
    </div>
  )
}

const numData = [
  {
    id: 'year',
    num: 12,
    duration: 1,
    unit: '年',
    des: '专注技术服务12年'
  }, {
    id: 'support',
    num: 100,
    duration: 1.5,
    unit: '+',
    des: '100多位专业技术团队支持'
  }, {
    id: 'service',
    num: 2000,
    duration: 2,
    unit: '+',
    des: '已服务2000多家企业'
  }, {
    id: 'position',
    num: 150000,
    duration: 2,
    unit: '+',
    des: '累计为15万多雇员提供优质的岗位服务'
  },
]