import ReactDOM from 'react-dom'
import _ from "lodash";

export const Tip = {
  open(msg) {
    const el = document.createElement('div');
    el.id = 'tip-' + _.random(0, 100);
    el.style.animation = '3.2s linear tip-animate';
    el.style.zIndex = '9999';
    el.style.position = 'fixed';
    const rootFontSize = _.floor(Number(document.getElementsByTagName("html")[0].style.fontSize.slice(0, -2)) || 16);
    console.log(rootFontSize)
    el.style.top = (100 / rootFontSize) + 'rem';
    console.log(el.style.top)
    el.style.left = '42.5%';
    document.getElementById('__next').appendChild(el);
    const tipEl = document.getElementById(el.id);
    ReactDOM.render(<TipTemplate msg={msg}/>, tipEl);
    setTimeout(() => {
      document.getElementById('__next').removeChild(tipEl);
    }, 3000);
  }
}

const TipTemplate = (props) => {
  return (
    <div className={'border border-bang w-72 h-16 bg-gray-50 flex justify-center items-center rounded-lg'}>
      {props.msg}
    </div>
  )
}