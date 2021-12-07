import ReactDOM from 'react-dom'
import {useRef, useState} from "react";
import cn from "classnames";
import _ from "lodash";
import {Http} from "../../utils/http";
import {Tip} from "../tip/Tip";
import {useEffectOnce, usePageLeave} from "react-use";

export const Modal = {
  open() {
    const el = document.createElement('div');
    el.id = 'modal';
    document.getElementById('__next').appendChild(el);
    const modalEl = document.getElementById('modal');
    ReactDOM.render(<ModalTemplate/>, modalEl);
  },
  close() {
    const modalEl = document.getElementById('modal');
    document.getElementById('__next').removeChild(modalEl);
  }
}


const ModalTemplate = () => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    scale: ''
  });
  const [error, setError] = useState({
    name: '',
    phone: '',
    company: ''
  });

  const [hover, setHover] = useState(false);
  usePageLeave(() => {
    setHover(false);
  });
  return (
    <div style={{zIndex: 9999}}
         className={'fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center'}>
      <div style={{width: '30rem'}} className={'relative opacity-100 py-16 px-20 bg-white z-50 rounded-lg flex-center'}>
        <h2 className={'text-2xl text-cblack select-none'}>仅需1步，即刻预约体验</h2>
        <div>
          <div
            className={'w-80 h-12 rounded bg-input flex mt-10 hover:border-bang border-2 border-transparent trans-motion'}>
            <img src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/form-name.png'}
                 style={{width: '1.5rem', height: '1.5rem'}} alt={'form-icon'}
                 className={'my-3 ml-2.5 mr-2 '}/>
            <input value={formData.name} onChange={event => {
              setFormData(prevState => ({...prevState, name: event.target.value}));
            }} className={'h-full w-full bg-input outline-none rounded-r-lg'}
                   placeholder={'您的昵称'}/>
          </div>
          <div className={cn(error.name && 'block', 'ml-2 text-red-500')}>{error.name}</div>
        </div>
        <div>
          <div
            className={'w-80 h-12 rounded bg-input flex mt-5 hover:border-bang border-2 border-transparent trans-motion'}>
            <img src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/form-phone.png'}
                 style={{width: '1.5rem', height: '1.5rem'}} alt={'form-icon'}
                 className={'my-3 ml-2.5 mr-2'}/>
            <input value={formData.phone} onChange={event => {
              setFormData(prevState => ({...prevState, phone: event.target.value}));
            }} className={'h-full w-full bg-input outline-none rounded-r-lg'}
                   placeholder={'您的手机号码'}/>
          </div>
          <div className={cn(error.phone && 'block', 'ml-2 text-red-500')}>{error.phone}</div>
        </div>
        <div>
          <div
            className={'w-80 h-12 rounded bg-input flex mt-5 hover:border-bang border-2 border-transparent trans-motion'}>
            <img src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/form-company.png'}
                 style={{width: '1.5rem', height: '1.5rem'}} alt={'form-icon'}
                 className={'my-3 ml-2.5 mr-2'}/>
            <input value={formData.company} onChange={event => {
              setFormData(prevState => ({...prevState, company: event.target.value}));
            }} className={'h-full w-full bg-input outline-none rounded-r-lg'}
                   placeholder={'企业名称'}/>
          </div>
          <div className={cn(error.name && 'block', 'ml-2 text-red-500')}>{error.company}</div>
        </div>
        <div className={'relative w-80'}>
          <div
            className={'w-full h-12 rounded bg-input flex mt-5 hover:border-bang border-2 border-transparent trans-motion'}>
            <img src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/form-scale.png'}
                 style={{width: '1.5rem', height: '1.5rem'}} alt={'form-icon'}
                 className={'my-3 ml-2.5 mr-2'}/>
            <input readOnly className={'h-full w-full bg-input outline-none rounded-r-lg cursor-pointer'}
                   placeholder={'请选择企业规模'} value={formData.scale}
                   onClick={() => {
                     setHover(true);
                   }}/>
          </div>
          <div
            onMouseLeave={() => {
              setHover(false);
            }}
            className={cn(hover ? 'block' : 'hidden', 'absolute w-full bg-gray-50 rounded-br rounded-bl overflow-hidden')}>
            {list.map(value =>
              <div key={value.id} className={'cursor-pointer hover:bg-gray-200 select-none px-4 py-2 trans-motion'}
                   onMouseEnter={() => {
                     setFormData(prevState => ({...prevState, scale: value.option}));
                   }}
                   onClick={() => {
                     setFormData(prevState => ({...prevState, scale: value.option}));
                     setHover(false);
                   }}>{value.option}
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            let flag = true;
            setError({name: '', phone: '', company: ''});
            if (!formData.name) {
              flag = false;
              setError(prevState => ({...prevState, name: '请输入昵称！'}));
            } else {
              if (formData.name.length > 10) {
                flag = false;
                setError(prevState => ({...prevState, name: '请输入10个字数以内的昵称！'}));
              }
            }
            if (!formData.phone) {
              flag = false;
              setError(prevState => ({...prevState, phone: '请输入手机号！'}));
            }
            if (!(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(formData.phone))) {
              flag = false;
              setError(prevState => ({...prevState, phone: '请输入正确的手机号！'}));
            }
            if (formData.company.length > 50) {
              flag = false;
              setError(prevState => ({...prevState, company: '请输入50个字数以内的企业名称！'}));
            }
            if (flag) {
              setError({name: '', phone: '', company: ''});
              const postData = {
                contact: formData.name,
                phone: formData.phone,
                name: formData.company,
                scale: formData.scale ? String(_.find(list, {option: formData.scale}).id) : ''
              }
              Http.postConsultation(postData).then(({success, message}) => {
                if (success) {
                  Modal.close();
                  Tip.open('提交成功，工作人员会尽快联系您');
                } else {
                  Tip.open(message);
                }
              });
            }
          }}
          className={'w-80 h-12 mt-12 bg-bang text-white cursor-pointer select-none flex-center justify-center rounded text-lg'}>提交
        </div>
        <CloseSvg/>
      </div>
    </div>
  )
}

const list = [{
  id: 1,
  option: '5人以下'
}, {
  id: 2,
  option: '5至100人'
}, {
  id: 3,
  option: '100人至200人'
}, {
  id: 4,
  option: '200人以上'
},]

const CloseSvg = () => (
  <svg onClick={() => Modal.close()} width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
       xmlns="http://www.w3.org/2000/svg"
       className={'cursor-pointer absolute top-8 right-8'}
       xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="产品服务" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="服务外包-表单提交" transform="translate(-1196.000000, -280.000000)">
        <g id="编组" transform="translate(1196.000000, 280.000000)">
          <rect id="矩形" fillOpacity="0.01" fill="#FFFFFF" fillRule="nonzero" x="0" y="0" width="24" height="24"/>
          <line x1="7" y1="7" x2="17" y2="17" id="路径" stroke="#262A33" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
          <line x1="7" y1="17" x2="17" y2="7" id="路径" stroke="#262A33" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
        </g>
      </g>
    </g>
  </svg>);