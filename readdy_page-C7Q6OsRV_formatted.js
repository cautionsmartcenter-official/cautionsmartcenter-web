import{
  c as e,n as t,t as n
}from"./jsx-runtime-BgeBYMR2.js";
import{
  i as r
}from"./chunk-EVOBXE3Y-ZbIjXw_o.js";
import{
  a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p
}from"./Footer-C-U-ezfE.js";
var m=e(n(),1),h=e(t(),1),g=class extends h.Component{
  getSnapshotBeforeUpdate(e){
    let t=this.props.childRef.current;
    if(t&&e.isPresent&&!this.props.isPresent){
      let e=t.offsetParent,n=l(e)&&e.offsetWidth||0,r=this.props.sizeRef.current;
      r.height=t.offsetHeight||0,r.width=t.offsetWidth||0,r.top=t.offsetTop,r.left=t.offsetLeft,r.right=n-r.width-r.left
    }return null
  }componentDidUpdate(){
    
  }render(){
    return this.props.children
  }
};
function _({
  children:e,isPresent:t,anchorX:n,root:r
}){
  let a=(0,h.useId)(),o=(0,h.useRef)(null),s=(0,h.useRef)({
    width:0,height:0,top:0,left:0,right:0
  }),{
    nonce:c
  }=(0,h.useContext)(i);
  return(0,h.useInsertionEffect)(()=>{
    let{
      width:e,height:i,top:l,left:u,right:d
    }=s.current;
    if(t||!o.current||!e||!i)return;
    let f=n===`left`?`left: ${
      u
    }`:`right: ${
      d
    }`;
    o.current.dataset.motionPopId=a;
    let p=document.createElement(`style`);
    c&&(p.nonce=c);
    let m=r??document.head;
    return m.appendChild(p),p.sheet&&p.sheet.insertRule(`
          [
      data-motion-pop-id="${
        a
      }"
    ] {
      
            position: absolute !important;
      
            width: ${
        e
      }px !important;
      
            height: ${
        i
      }px !important;
      
            ${
        f
      }px !important;
      
            top: ${
        l
      }px !important;
      
          
    }
        `),()=>{
      m.contains(p)&&m.removeChild(p)
    }
  },[
    t
  ]),(0,m.jsx)(g,{
    isPresent:t,childRef:o,sizeRef:s,children:h.cloneElement(e,{
      ref:o
    })
  })
}var v=({
  children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:a,mode:o,anchorX:c,root:l
})=>{
  let u=s(y),f=(0,h.useId)(),p=!0,g=(0,h.useMemo)(()=>(p=!1,{
    id:f,initial:t,isPresent:n,custom:i,onExitComplete:e=>{
      u.set(e,!0);
      for(let e of u.values())if(!e)return;
      r&&r()
    },register:e=>(u.set(e,!1),()=>u.delete(e))
  }),[
    n,u,r
  ]);
  return a&&p&&(g={
    ...g
  }),(0,h.useMemo)(()=>{
    u.forEach((e,t)=>u.set(t,!1))
  },[
    n
  ]),h.useEffect(()=>{
    !n&&!u.size&&r&&r()
  },[
    n
  ]),o===`popLayout`&&(e=(0,m.jsx)(_,{
    isPresent:n,anchorX:c,root:l,children:e
  })),(0,m.jsx)(d.Provider,{
    value:g,children:e
  })
};
function y(){
  return new Map
}var b=e=>e.key||``;
function x(e){
  let t=[
    
  ];
  return h.Children.forEach(e,e=>{
    (0,h.isValidElement)(e)&&t.push(e)
  }),t
}var S=({
  children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:c=`sync`,propagate:l=!1,anchorX:u=`left`,root:d
})=>{
  let[
    f,g
  ]=o(l),_=(0,h.useMemo)(()=>x(e),[
    e
  ]),y=l&&!f?[
    
  ]:_.map(b),S=(0,h.useRef)(!0),C=(0,h.useRef)(_),w=s(()=>new Map),[
    T,E
  ]=(0,h.useState)(_),[
    D,O
  ]=(0,h.useState)(_);
  a(()=>{
    S.current=!1,C.current=_;
    for(let e=0;
    e<D.length;
    e++){
      let t=b(D[
        e
      ]);
      y.includes(t)?w.delete(t):w.get(t)!==!0&&w.set(t,!1)
    }
  },[
    D,y.length,y.join(`-`)
  ]);
  let k=[
    
  ];
  if(_!==T){
    let e=[
      ..._
    ];
    for(let t=0;
    t<D.length;
    t++){
      let n=D[
        t
      ],r=b(n);
      y.includes(r)||(e.splice(t,0,n),k.push(n))
    }return c===`wait`&&k.length&&(e=k),O(x(e)),E(_),null
  }let{
    forceRender:A
  }=(0,h.useContext)(p);
  return(0,m.jsx)(m.Fragment,{
    children:D.map(e=>{
      let a=b(e),o=l&&!f?!1:_===D||y.includes(a);
      return(0,m.jsx)(v,{
        isPresent:o,initial:!S.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:c,root:d,onExitComplete:o?void 0:()=>{
          if(w.has(a))w.set(a,!0);
          else return;
          let e=!0;
          w.forEach(t=>{
            t||(e=!1)
          }),e&&(A?.(),O(C.current),l&&g?.(),r&&r())
        },anchorX:u,children:e
      },a)
    })
  })
};
function C(){
  return(0,m.jsxs)(`section`,{
    className:`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-dark to-dark`,children:[
      (0,m.jsxs)(`div`,{
        className:`absolute inset-0`,children:[
          (0,m.jsx)(`img`,{
            src:`https://readdy.ai/api/search-image?query=modern%20luxury%20automotive%20service%20center%20with%20advanced%20robotic%20technology%20equipment%20in%20professional%20workshop%20environment%2C%20sleek%20metallic%20surfaces%2C%20dramatic%20lighting%2C%20high-tech%20atmosphere%2C%20minimalist%20industrial%20design%2C%20dark%20sophisticated%20background%20with%20red%20accent%20lighting&width=1920&height=1080&seq=hero-bg-001&orientation=landscape`,alt:`Background`,className:`w-full h-full object-cover object-center opacity-40`
          }),(0,m.jsx)(`div`,{
            className:`absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50`
          })
        ]
      }),(0,m.jsx)(`div`,{
        className:`absolute right-0 top-0 bottom-0 w-1/2 opacity-20`,children:(0,m.jsx)(`img`,{
          src:`https://readdy.ai/api/search-image?query=futuristic%20industrial%20robotic%20arm%20silhouette%20with%20precision%20spray%20painting%20equipment%2C%20transparent%20background%20style%2C%20minimalist%20tech%20illustration%2C%20sleek%20mechanical%20design%2C%20modern%20automation%20technology&width=800&height=1080&seq=robot-silhouette-001&orientation=portrait`,alt:`AI Robot`,className:`w-full h-full object-contain object-right`
        })
      }),(0,m.jsxs)(`div`,{
        className:`relative z-10 mx-auto px-6 lg:px-12 py-32 max-w-7xl w-full`,children:[
          (0,m.jsxs)(u.div,{
            initial:{
              opacity:0,y:30
            },animate:{
              opacity:1,y:0
            },transition:{
              duration:.8
            },className:`max-w-3xl`,children:[
              (0,m.jsx)(u.div,{
                initial:{
                  opacity:0,x:-20
                },animate:{
                  opacity:1,x:0
                },transition:{
                  delay:.2
                },className:`inline-block mb-6`,children:(0,m.jsx)(`span`,{
                  className:`text-sm font-light text-gray-300 tracking-widest`,children:`AI 로봇 기술로`
                })
              }),(0,m.jsx)(u.h1,{
                initial:{
                  opacity:0,y:20
                },animate:{
                  opacity:1,y:0
                },transition:{
                  delay:.3
                },className:`text-5xl lg:text-7xl font-black text-white leading-tight mb-4`,children:`완벽한 페인트 보호`
              }),(0,m.jsxs)(u.div,{
                initial:{
                  opacity:0,y:20
                },animate:{
                  opacity:1,y:0
                },transition:{
                  delay:.4
                },className:`mb-6`,children:[
                  (0,m.jsx)(`h2`,{
                    className:`text-3xl lg:text-5xl font-black text-primary leading-tight`,children:`CAUTION SMART CENTER`
                  }),(0,m.jsx)(`div`,{
                    className:`w-24 h-1 bg-primary mt-4`
                  })
                ]
              }),(0,m.jsx)(u.p,{
                initial:{
                  opacity:0,y:20
                },animate:{
                  opacity:1,y:0
                },transition:{
                  delay:.5
                },className:`text-base lg:text-lg text-gray-300 leading-relaxed mb-12 max-w-2xl`,children:`수입차 정비부터 AI 로봇 PPS/PPCS까지, 프리미엄 올인원 솔루션`
              }),(0,m.jsxs)(u.div,{
                initial:{
                  opacity:0,y:20
                },animate:{
                  opacity:1,y:0
                },transition:{
                  delay:.6
                },className:`flex flex-col sm:flex-row gap-4`,children:[
                  (0,m.jsxs)(`a`,{
                    href:`#services`,className:`px-8 py-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer group`,children:[
                      `서비스 알아보기`,(0,m.jsx)(`i`,{
                        className:`ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform`
                      })
                    ]
                  }),(0,m.jsx)(`a`,{
                    href:`#ai-tech`,className:`px-8 py-4 bg-transparent text-white text-sm font-semibold rounded-full border-2 border-white hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer`,children:`AI 기술 보기`
                  })
                ]
              })
            ]
          }),(0,m.jsx)(u.div,{
            initial:{
              opacity:0
            },animate:{
              opacity:1
            },transition:{
              delay:1,duration:1
            },className:`absolute bottom-12 left-1/2 transform -translate-x-1/2`,children:(0,m.jsxs)(`div`,{
              className:`flex flex-col items-center gap-2`,children:[
                (0,m.jsx)(`span`,{
                  className:`text-xs text-gray-400 tracking-widest`,children:`SCROLL`
                }),(0,m.jsx)(u.div,{
                  animate:{
                    y:[
                      0,8,0
                    ]
                  },transition:{
                    repeat:1/0,duration:1.5
                  },className:`w-5 h-5 flex items-center justify-center`,children:(0,m.jsx)(`i`,{
                    className:`ri-arrow-down-line text-gray-400`
                  })
                })
              ]
            })
          })
        ]
      })
    ]
  })
}function w(){
  let e=r();
  return(0,m.jsx)(`section`,{
    id:`services`,className:`py-24 lg:py-32 bg-gray-50`,children:(0,m.jsxs)(`div`,{
      className:`mx-auto px-6 lg:px-12 max-w-7xl`,children:[
        (0,m.jsxs)(u.div,{
          initial:{
            opacity:0,y:20
          },whileInView:{
            opacity:1,y:0
          },viewport:{
            once:!0
          },className:`mb-16`,children:[
            (0,m.jsx)(`div`,{
              className:`inline-block px-4 py-2 bg-primary rounded-full mb-4`,children:(0,m.jsx)(`span`,{
                className:`text-xs font-semibold text-white tracking-wider`,children:`OUR SERVICES`
              })
            }),(0,m.jsx)(`h2`,{
              className:`text-4xl lg:text-5xl font-black text-dark mb-4`,children:`프리미엄 토탈 케어`
            }),(0,m.jsx)(`p`,{
              className:`text-base text-gray-600 max-w-2xl`,children:`수입차 전문 정비부터 최첨단 보호까지`
            })
          ]
        }),(0,m.jsx)(`div`,{
          className:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`,children:[
            {
              id:`repair`,title:`수입차 정비`,description:`전문 기술진의 정밀한 진단과 정비로 수입차의 최상의 컨디션을 유지합니다`,image:`https://readdy.ai/api/search-image?query=professional%20automotive%20mechanic%20working%20on%20luxury%20imported%20car%20engine%20in%20modern%20clean%20workshop%2C%20precision%20tools%20and%20diagnostic%20equipment%2C%20professional%20lighting%2C%20simple%20clean%20background%2C%20high-end%20service%20atmosphere&width=600&height=400&seq=service-repair-001&orientation=landscape`,bgColor:`bg-gray-100`
            },{
              id:`paint`,title:`판금도색`,description:`완벽한 색상 매칭과 정밀한 판금 작업으로 차량을 새것처럼 복원합니다`,image:`https://readdy.ai/api/search-image?query=automotive%20paint%20booth%20with%20luxury%20car%20being%20painted%2C%20professional%20spray%20painting%20equipment%2C%20mint%20green%20ambient%20lighting%2C%20clean%20industrial%20environment%2C%20simple%20background%2C%20premium%20quality%20finish&width=600&height=400&seq=service-paint-001&orientation=landscape`,bgColor:`bg-teal-50`
            },{
              id:`detailing`,title:`디테일링`,description:`세심한 손길로 차량의 모든 부분을 완벽하게 관리하는 프리미엄 케어`,image:`https://readdy.ai/api/search-image?query=luxury%20car%20detailing%20service%20with%20professional%20polishing%20equipment%2C%20pristine%20vehicle%20surface%20reflection%2C%20clean%20modern%20studio%20environment%2C%20simple%20light%20background%2C%20premium%20care%20atmosphere&width=600&height=400&seq=service-detail-001&orientation=landscape`,bgColor:`bg-gray-50`
            },{
              id:`ai-tech`,title:`AI PPS/PPCS`,description:`AI 로봇 기술로 구현하는 차세대 페인트 보호 시스템`,image:`https://readdy.ai/api/search-image?query=advanced%20robotic%20arm%20applying%20protective%20coating%20on%20luxury%20car%20surface%2C%20futuristic%20AI%20technology%2C%20red%20accent%20lighting%2C%20high-tech%20automated%20system%2C%20simple%20dark%20background%2C%20innovation%20and%20precision&width=600&height=400&seq=service-ai-001&orientation=landscape`,bgColor:`bg-gradient-to-br from-red-50 to-gray-50`,badge:`NEW`
            }
          ].map((t,n)=>(0,m.jsx)(u.div,{
            initial:{
              opacity:0,y:30
            },whileInView:{
              opacity:1,y:0
            },viewport:{
              once:!0
            },transition:{
              delay:n*.1
            },className:`group cursor-pointer`,onClick:()=>e(`/services/${
              t.id
            }`),children:(0,m.jsxs)(`div`,{
              className:`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`,children:[
                (0,m.jsxs)(`div`,{
                  className:`relative ${
                    t.bgColor
                  } overflow-hidden`,children:[
                    (0,m.jsx)(`div`,{
                      className:`w-full h-56`,children:(0,m.jsx)(`img`,{
                        src:t.image,alt:t.title,className:`w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500`
                      })
                    }),t.badge&&(0,m.jsx)(`div`,{
                      className:`absolute top-4 right-4 px-3 py-1 bg-primary rounded-full`,children:(0,m.jsx)(`span`,{
                        className:`text-xs font-bold text-white`,children:t.badge
                      })
                    })
                  ]
                }),(0,m.jsxs)(`div`,{
                  className:`p-6`,children:[
                    (0,m.jsx)(`h3`,{
                      className:`text-xl font-bold text-dark mb-3`,children:t.title
                    }),(0,m.jsx)(`p`,{
                      className:`text-sm text-gray-600 leading-relaxed mb-4`,children:t.description
                    }),(0,m.jsx)(`div`,{
                      className:`flex items-center justify-end`,children:(0,m.jsx)(`div`,{
                        className:`w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary transition-colors`,children:(0,m.jsx)(`i`,{
                          className:`ri-arrow-right-line text-primary group-hover:text-white transition-colors`
                        })
                      })
                    })
                  ]
                })
              ]
            })
          },t.id))
        })
      ]
    })
  })
}function T(){
  return(0,m.jsx)(`section`,{
    id:`ai-tech`,className:`py-24 lg:py-32 bg-white`,children:(0,m.jsx)(`div`,{
      className:`mx-auto px-6 lg:px-12 max-w-7xl`,children:(0,m.jsxs)(`div`,{
        className:`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`,children:[
          (0,m.jsxs)(u.div,{
            initial:{
              opacity:0,x:-30
            },whileInView:{
              opacity:1,x:0
            },viewport:{
              once:!0
            },className:`relative`,children:[
              (0,m.jsx)(`div`,{
                className:`relative rounded-[
                  40px
                ] overflow-hidden shadow-2xl`,children:(0,m.jsx)(`div`,{
                  className:`w-full h-[
                    500px
                  ]`,children:(0,m.jsx)(`img`,{
                    src:`https://readdy.ai/api/search-image?query=advanced%20industrial%20robotic%20arm%20with%20precision%20spray%20coating%20system%20working%20on%20luxury%20car%20surface%2C%20futuristic%20AI%20automation%20technology%2C%20red%20and%20white%20color%20scheme%2C%20high-tech%20workshop%20environment%2C%20clean%20professional%20lighting%2C%20innovation%20and%20precision%20engineering&width=800&height=800&seq=ai-tech-main-001&orientation=squarish`,alt:`AI Robot Technology`,className:`w-full h-full object-cover object-center`
                  })
                })
              }),(0,m.jsx)(u.div,{
                initial:{
                  opacity:0,y:20
                },whileInView:{
                  opacity:1,y:0
                },viewport:{
                  once:!0
                },transition:{
                  delay:.3
                },className:`absolute -bottom-8 -right-8 bg-dark rounded-2xl p-6 shadow-xl`,children:(0,m.jsxs)(`div`,{
                  className:`flex items-start gap-4`,children:[
                    (0,m.jsx)(`div`,{
                      className:`w-1 h-16 bg-primary rounded-full`
                    }),(0,m.jsxs)(`div`,{
                      children:[
                        (0,m.jsx)(`div`,{
                          className:`text-4xl font-black text-white mb-1`,children:`99.9%`
                        }),(0,m.jsx)(`div`,{
                          className:`text-sm text-gray-400`,children:`정밀도`
                        }),(0,m.jsx)(`div`,{
                          className:`text-xs text-gray-500 mt-1`,children:`AI 로봇 기술`
                        })
                      ]
                    })
                  ]
                })
              })
            ]
          }),(0,m.jsxs)(u.div,{
            initial:{
              opacity:0,x:30
            },whileInView:{
              opacity:1,x:0
            },viewport:{
              once:!0
            },children:[
              (0,m.jsx)(`div`,{
                className:`inline-block px-4 py-2 bg-primary rounded-full mb-6`,children:(0,m.jsx)(`span`,{
                  className:`text-xs font-semibold text-white tracking-wider`,children:`AI TECHNOLOGY`
                })
              }),(0,m.jsxs)(`h2`,{
                className:`text-4xl lg:text-5xl font-black text-dark leading-tight mb-6`,children:[
                  `AI 로봇이 만드는`,(0,m.jsx)(`br`,{
                    
                  }),`완벽한 페인트 보호막`
                ]
              }),(0,m.jsx)(`p`,{
                className:`text-base text-gray-600 leading-relaxed mb-8`,children:`기존 PPS와 랩핑을 뛰어넘는 프리미엄 솔루션. CAUTION의 AI 로봇 기술은 미세한 부분까지 완벽하게 시공하여 차량의 페인트를 장기간 보호합니다. 정밀한 센서와 알고리즘으로 균일한 코팅을 보장하며, 사람의 손으로는 불가능한 완벽한 마감을 실현합니다.`
              }),(0,m.jsx)(`div`,{
                className:`space-y-4 mb-10`,children:[
                  `정밀한 AI 로봇 시공`,`균일한 코팅 두께`,`빠른 작업 시간`,`완벽한 마감 품질`
                ].map((e,t)=>(0,m.jsxs)(u.div,{
                  initial:{
                    opacity:0,x:20
                  },whileInView:{
                    opacity:1,x:0
                  },viewport:{
                    once:!0
                  },transition:{
                    delay:t*.1
                  },className:`flex items-center gap-3`,children:[
                    (0,m.jsx)(`div`,{
                      className:`w-6 h-6 flex items-center justify-center rounded-full bg-primary/10`,children:(0,m.jsx)(`i`,{
                        className:`ri-check-line text-primary text-sm`
                      })
                    }),(0,m.jsx)(`span`,{
                      className:`text-sm font-semibold text-dark`,children:e
                    })
                  ]
                },t))
              }),(0,m.jsxs)(`a`,{
                href:`#contact`,className:`inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-dark text-dark text-sm font-semibold rounded-full hover:bg-dark hover:text-white transition-all whitespace-nowrap cursor-pointer group`,children:[
                  `기술 상세보기`,(0,m.jsx)(`i`,{
                    className:`ri-arrow-right-up-line text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  })
}function E(){
  let e=[
    {
      id:1,rating:5,content:`AI 로봇 PPS 시공을 받았는데 정말 놀라웠습니다. 기존 랩핑과는 차원이 다른 마감 품질이에요. 균일한 코팅과 완벽한 광택, 그리고 무엇보다 내구성이 뛰어나서 매우 만족스럽습니다. CAUTION의 기술력은 정말 최고입니다.`,name:`김민수`,car:`BMW 5 Series`,image:`https://readdy.ai/api/search-image?query=professional%20korean%20businessman%20portrait%20in%20business%20casual%20attire%2C%20confident%20smile%2C%20modern%20clean%20background%2C%20professional%20photography%20style&width=120&height=120&seq=customer-001&orientation=squarish`
    },{
      id:2,rating:5,content:`수입차 정비부터 디테일링까지 한 곳에서 모두 해결할 수 있어서 너무 편리합니다. 특히 판금도색 작업이 정말 완벽했어요. 색상 매칭도 정확하고 마감도 깔끔해서 사고 전보다 더 좋아 보입니다. 강력 추천합니다!`,name:`박지영`,car:`Mercedes-Benz E-Class`,image:`https://readdy.ai/api/search-image?query=professional%20korean%20businesswoman%20portrait%20in%20elegant%20attire%2C%20warm%20smile%2C%20modern%20clean%20background%2C%20professional%20photography%20style&width=120&height=120&seq=customer-002&orientation=squarish`
    },{
      id:3,rating:5,content:`PPCS 시공 후 차량이 완전히 새것처럼 변했습니다. AI 로봇 기술이라 시공 시간도 빠르고 품질도 일정해서 믿을 수 있었어요. 직원분들도 친절하고 전문적이어서 안심하고 맡길 수 있었습니다. 다음에도 꼭 이용할게요.`,name:`이준호`,car:`Audi A6`,image:`https://readdy.ai/api/search-image?query=professional%20korean%20man%20portrait%20in%20smart%20casual%20attire%2C%20friendly%20expression%2C%20modern%20clean%20background%2C%20professional%20photography%20style&width=120&height=120&seq=customer-003&orientation=squarish`
    }
  ],[
    t,n
  ]=(0,h.useState)(0);
  return(0,m.jsx)(`section`,{
    className:`py-24 lg:py-32 bg-gray-50`,children:(0,m.jsxs)(`div`,{
      className:`mx-auto px-6 lg:px-12 max-w-5xl`,children:[
        (0,m.jsxs)(u.div,{
          initial:{
            opacity:0,y:20
          },whileInView:{
            opacity:1,y:0
          },viewport:{
            once:!0
          },className:`text-center mb-16`,children:[
            (0,m.jsx)(`h2`,{
              className:`text-4xl lg:text-5xl font-black text-dark mb-4`,children:`고객님들의 생생한 후기`
            }),(0,m.jsx)(`div`,{
              className:`w-16 h-1 bg-primary mx-auto`
            })
          ]
        }),(0,m.jsxs)(`div`,{
          className:`relative`,children:[
            (0,m.jsx)(S,{
              mode:`wait`,children:(0,m.jsxs)(u.div,{
                initial:{
                  opacity:0,x:50
                },animate:{
                  opacity:1,x:0
                },exit:{
                  opacity:0,x:-50
                },transition:{
                  duration:.3
                },className:`bg-white rounded-[
                  30px
                ] p-8 lg:p-12 shadow-lg`,children:[
                  (0,m.jsxs)(`div`,{
                    className:`inline-flex items-center gap-2 px-4 py-2 bg-dark rounded-full mb-6`,children:[
                      (0,m.jsx)(`i`,{
                        className:`ri-star-fill text-primary w-4 h-4 flex items-center justify-center`
                      }),(0,m.jsx)(`span`,{
                        className:`text-sm font-bold text-white`,children:e[
                          t
                        ].rating
                      })
                    ]
                  }),(0,m.jsxs)(`div`,{
                    className:`mb-8`,children:[
                      (0,m.jsx)(`i`,{
                        className:`ri-double-quotes-l text-4xl text-gray-200 mb-4`
                      }),(0,m.jsx)(`p`,{
                        className:`text-base lg:text-lg text-gray-700 leading-relaxed font-serif`,children:e[
                          t
                        ].content
                      })
                    ]
                  }),(0,m.jsxs)(`div`,{
                    className:`flex items-center justify-between`,children:[
                      (0,m.jsxs)(`div`,{
                        className:`flex items-center gap-4`,children:[
                          (0,m.jsx)(`div`,{
                            className:`w-16 h-16 rounded-full overflow-hidden`,children:(0,m.jsx)(`img`,{
                              src:e[
                                t
                              ].image,alt:e[
                                t
                              ].name,className:`w-full h-full object-cover object-center`
                            })
                          }),(0,m.jsxs)(`div`,{
                            children:[
                              (0,m.jsx)(`div`,{
                                className:`text-base font-bold text-dark`,children:e[
                                  t
                                ].name
                              }),(0,m.jsx)(`div`,{
                                className:`text-sm text-gray-500`,children:e[
                                  t
                                ].car
                              })
                            ]
                          })
                        ]
                      }),(0,m.jsxs)(`div`,{
                        className:`flex items-center gap-2`,children:[
                          (0,m.jsx)(`button`,{
                            onClick:()=>{
                              n(t=>t===0?e.length-1:t-1)
                            },className:`w-11 h-11 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 hover:border-dark transition-colors cursor-pointer`,"aria-label":`이전`,children:(0,m.jsx)(`i`,{
                              className:`ri-arrow-left-line text-dark`
                            })
                          }),(0,m.jsx)(`button`,{
                            onClick:()=>{
                              n(t=>t===e.length-1?0:t+1)
                            },className:`w-11 h-11 flex items-center justify-center rounded-full bg-black hover:bg-dark transition-colors cursor-pointer`,"aria-label":`다음`,children:(0,m.jsx)(`i`,{
                              className:`ri-arrow-right-line text-white`
                            })
                          })
                        ]
                      })
                    ]
                  })
                ]
              },t)
            }),(0,m.jsx)(`div`,{
              className:`flex items-center justify-center gap-2 mt-8`,children:e.map((e,r)=>(0,m.jsx)(`button`,{
                onClick:()=>n(r),className:`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  r===t?`bg-primary w-8`:`bg-gray-300`
                }`,"aria-label":`후기 ${
                  r+1
                }`
              },r))
            })
          ]
        })
      ]
    })
  })
}function D(){
  return(0,m.jsxs)(`section`,{
    className:`relative py-32 bg-dark overflow-hidden`,children:[
      (0,m.jsx)(`div`,{
        className:`absolute inset-0 opacity-5`,children:(0,m.jsx)(`div`,{
          className:`absolute inset-0`,style:{
            backgroundImage:`radial-gradient(circle, white 1px, transparent 1px)`,backgroundSize:`50px 50px`
          }
        })
      }),(0,m.jsxs)(`div`,{
        className:`relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center`,children:[
          (0,m.jsxs)(u.div,{
            initial:{
              opacity:0,y:30
            },whileInView:{
              opacity:1,y:0
            },viewport:{
              once:!0
            },children:[
              (0,m.jsx)(`h2`,{
                className:`text-4xl lg:text-6xl font-black text-white mb-6 leading-tight`,children:`지금 바로 시작하세요`
              }),(0,m.jsx)(`p`,{
                className:`text-base lg:text-lg text-gray-400 mb-12 max-w-2xl mx-auto`,children:`전문가 상담부터 AI 시공까지, 원스톱 서비스`
              }),(0,m.jsxs)(`a`,{
                href:`#contact`,className:`inline-flex items-center gap-3 px-10 py-5 bg-primary text-white text-base font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer group`,children:[
                  `무료 상담 신청하기`,(0,m.jsx)(`i`,{
                    className:`ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform`
                  })
                ]
              })
            ]
          }),(0,m.jsxs)(u.div,{
            initial:{
              opacity:0,y:50
            },whileInView:{
              opacity:1,y:0
            },viewport:{
              once:!0
            },transition:{
              delay:.3
            },className:`mt-20 flex items-center justify-center gap-8 opacity-20`,children:[
              (0,m.jsx)(`img`,{
                src:`https://readdy.ai/api/search-image?query=luxury%20sedan%20car%20silhouette%20side%20view%2C%20transparent%20background%20style%2C%20minimalist%20vector%20illustration%2C%20sleek%20automotive%20design%2C%20monochrome%20dark%20tone&width=400&height=200&seq=car-silhouette-001&orientation=landscape`,alt:`Sedan`,className:`w-48 h-auto`
              }),(0,m.jsx)(`img`,{
                src:`https://readdy.ai/api/search-image?query=luxury%20SUV%20car%20silhouette%20side%20view%2C%20transparent%20background%20style%2C%20minimalist%20vector%20illustration%2C%20sleek%20automotive%20design%2C%20monochrome%20dark%20tone&width=400&height=200&seq=car-silhouette-002&orientation=landscape`,alt:`SUV`,className:`w-52 h-auto -mt-4`
              }),(0,m.jsx)(`img`,{
                src:`https://readdy.ai/api/search-image?query=sports%20car%20silhouette%20side%20view%2C%20transparent%20background%20style%2C%20minimalist%20vector%20illustration%2C%20sleek%20automotive%20design%2C%20monochrome%20dark%20tone&width=400&height=200&seq=car-silhouette-003&orientation=landscape`,alt:`Sports Car`,className:`w-48 h-auto`
              })
            ]
          })
        ]
      })
    ]
  })
}function O(){
  let[
    e,t
  ]=(0,h.useState)({
    name:``,phone:``,email:``,service:``,message:``
  }),[
    n,r
  ]=(0,h.useState)(!1),[
    i,a
  ]=(0,h.useState)(`idle`),o=n=>{
    t({
      ...e,[
        n.target.name
      ]:n.target.value
    })
  };
  return(0,m.jsx)(`section`,{
    id:`contact`,className:`py-24 lg:py-32 bg-white`,children:(0,m.jsx)(`div`,{
      className:`mx-auto px-6 lg:px-12 max-w-6xl`,children:(0,m.jsxs)(`div`,{
        className:`grid grid-cols-1 lg:grid-cols-2 gap-16`,children:[
          (0,m.jsxs)(u.div,{
            initial:{
              opacity:0,x:-30
            },whileInView:{
              opacity:1,x:0
            },viewport:{
              once:!0
            },children:[
              (0,m.jsx)(`div`,{
                className:`inline-block px-4 py-2 bg-primary rounded-full mb-6`,children:(0,m.jsx)(`span`,{
                  className:`text-xs font-semibold text-white tracking-wider`,children:`CONTACT US`
                })
              }),(0,m.jsx)(`h2`,{
                className:`text-4xl lg:text-5xl font-black text-dark mb-6 leading-tight`,children:`상담 신청하기`
              }),(0,m.jsx)(`p`,{
                className:`text-base text-gray-600 leading-relaxed mb-12`,children:`차량 관리에 대한 궁금한 점이나 서비스 문의사항을 남겨주세요. 전문 상담사가 빠르게 연락드리겠습니다.`
              }),(0,m.jsxs)(`div`,{
                className:`space-y-6`,children:[
                  (0,m.jsxs)(`div`,{
                    className:`flex items-start gap-4`,children:[
                      (0,m.jsx)(`div`,{
                        className:`w-12 h-12 flex items-center justify-center rounded-full bg-primary/10`,children:(0,m.jsx)(`i`,{
                          className:`ri-phone-line text-primary text-xl`
                        })
                      }),(0,m.jsxs)(`div`,{
                        children:[
                          (0,m.jsx)(`div`,{
                            className:`text-sm font-semibold text-dark mb-1`,children:`전화 문의`
                          }),(0,m.jsx)(`div`,{
                            className:`text-base text-gray-600`,children:`02-1234-5678`
                          })
                        ]
                      })
                    ]
                  }),(0,m.jsxs)(`div`,{
                    className:`flex items-start gap-4`,children:[
                      (0,m.jsx)(`div`,{
                        className:`w-12 h-12 flex items-center justify-center rounded-full bg-primary/10`,children:(0,m.jsx)(`i`,{
                          className:`ri-mail-line text-primary text-xl`
                        })
                      }),(0,m.jsxs)(`div`,{
                        children:[
                          (0,m.jsx)(`div`,{
                            className:`text-sm font-semibold text-dark mb-1`,children:`이메일`
                          }),(0,m.jsx)(`div`,{
                            className:`text-base text-gray-600`,children:`info@cautioncenter.com`
                          })
                        ]
                      })
                    ]
                  }),(0,m.jsxs)(`div`,{
                    className:`flex items-start gap-4`,children:[
                      (0,m.jsx)(`div`,{
                        className:`w-12 h-12 flex items-center justify-center rounded-full bg-primary/10`,children:(0,m.jsx)(`i`,{
                          className:`ri-map-pin-line text-primary text-xl`
                        })
                      }),(0,m.jsxs)(`div`,{
                        children:[
                          (0,m.jsx)(`div`,{
                            className:`text-sm font-semibold text-dark mb-1`,children:`주소`
                          }),(0,m.jsx)(`div`,{
                            className:`text-base text-gray-600`,children:`서울특별시 강남구`
                          })
                        ]
                      })
                    ]
                  }),(0,m.jsxs)(`div`,{
                    className:`flex items-start gap-4`,children:[
                      (0,m.jsx)(`div`,{
                        className:`w-12 h-12 flex items-center justify-center rounded-full bg-primary/10`,children:(0,m.jsx)(`i`,{
                          className:`ri-time-line text-primary text-xl`
                        })
                      }),(0,m.jsxs)(`div`,{
                        children:[
                          (0,m.jsx)(`div`,{
                            className:`text-sm font-semibold text-dark mb-1`,children:`운영 시간`
                          }),(0,m.jsx)(`div`,{
                            className:`text-base text-gray-600`,children:`평일 09:00 - 18:00`
                          }),(0,m.jsx)(`div`,{
                            className:`text-sm text-gray-500`,children:`주말 및 공휴일 휴무`
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),(0,m.jsx)(u.div,{
            initial:{
              opacity:0,x:30
            },whileInView:{
              opacity:1,x:0
            },viewport:{
              once:!0
            },children:(0,m.jsxs)(`form`,{
              id:`contact-form`,onSubmit:async n=>{
                n.preventDefault(),r(!0),a(`idle`);
                try{
                  let n=new URLSearchParams;
                  Object.entries(e).forEach(([
                    e,t
                  ])=>{
                    n.append(e,t)
                  }),(await fetch(`https://readdy.ai/api/form/d6dve1itehdqnvnpj4vg`,{
                    method:`POST`,headers:{
                      "Content-Type":`application/x-www-form-urlencoded`
                    },body:n.toString()
                  })).ok?(a(`success`),t({
                    name:``,phone:``,email:``,service:``,message:``
                  })):a(`error`)
                }catch{
                  a(`error`)
                }finally{
                  r(!1)
                }
              },className:`space-y-6`,"data-readdy-form":!0,children:[
                (0,m.jsxs)(`div`,{
                  children:[
                    (0,m.jsx)(`label`,{
                      htmlFor:`name`,className:`block text-sm font-semibold text-dark mb-2`,children:`이름 *`
                    }),(0,m.jsx)(`input`,{
                      type:`text`,id:`name`,name:`name`,value:e.name,onChange:o,required:!0,className:`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors`,placeholder:`홍길동`
                    })
                  ]
                }),(0,m.jsxs)(`div`,{
                  children:[
                    (0,m.jsx)(`label`,{
                      htmlFor:`phone`,className:`block text-sm font-semibold text-dark mb-2`,children:`연락처 *`
                    }),(0,m.jsx)(`input`,{
                      type:`tel`,id:`phone`,name:`phone`,value:e.phone,onChange:o,required:!0,className:`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors`,placeholder:`010-1234-5678`
                    })
                  ]
                }),(0,m.jsxs)(`div`,{
                  children:[
                    (0,m.jsx)(`label`,{
                      htmlFor:`email`,className:`block text-sm font-semibold text-dark mb-2`,children:`이메일 *`
                    }),(0,m.jsx)(`input`,{
                      type:`email`,id:`email`,name:`email`,value:e.email,onChange:o,required:!0,className:`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors`,placeholder:`example@email.com`
                    })
                  ]
                }),(0,m.jsxs)(`div`,{
                  children:[
                    (0,m.jsx)(`label`,{
                      htmlFor:`service`,className:`block text-sm font-semibold text-dark mb-2`,children:`관심 서비스 *`
                    }),(0,m.jsxs)(`select`,{
                      id:`service`,name:`service`,value:e.service,onChange:o,required:!0,className:`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer`,children:[
                        (0,m.jsx)(`option`,{
                          value:``,children:`선택해주세요`
                        }),(0,m.jsx)(`option`,{
                          value:`수입차 정비`,children:`수입차 정비`
                        }),(0,m.jsx)(`option`,{
                          value:`판금도색`,children:`판금도색`
                        }),(0,m.jsx)(`option`,{
                          value:`디테일링`,children:`디테일링`
                        }),(0,m.jsx)(`option`,{
                          value:`AI PPS/PPCS`,children:`AI PPS/PPCS`
                        }),(0,m.jsx)(`option`,{
                          value:`기타`,children:`기타`
                        })
                      ]
                    })
                  ]
                }),(0,m.jsxs)(`div`,{
                  children:[
                    (0,m.jsx)(`label`,{
                      htmlFor:`message`,className:`block text-sm font-semibold text-dark mb-2`,children:`문의 내용`
                    }),(0,m.jsx)(`textarea`,{
                      id:`message`,name:`message`,value:e.message,onChange:o,rows:4,maxLength:500,className:`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none`,placeholder:`문의하실 내용을 입력해주세요 (최대 500자)`
                    })
                  ]
                }),(0,m.jsx)(`button`,{
                  type:`submit`,disabled:n,className:`w-full px-8 py-4 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer`,children:n?`전송 중...`:`상담 신청하기`
                }),i===`success`&&(0,m.jsx)(`div`,{
                  className:`p-4 bg-green-50 border border-green-200 rounded-xl`,children:(0,m.jsx)(`p`,{
                    className:`text-sm text-green-800 text-center`,children:`문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.`
                  })
                }),i===`error`&&(0,m.jsx)(`div`,{
                  className:`p-4 bg-red-50 border border-red-200 rounded-xl`,children:(0,m.jsx)(`p`,{
                    className:`text-sm text-red-800 text-center`,children:`문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.`
                  })
                })
              ]
            })
          })
        ]
      })
    })
  })
}function k(){
  return(0,m.jsxs)(`div`,{
    className:`min-h-screen bg-white`,children:[
      (0,m.jsx)(c,{
        
      }),(0,m.jsxs)(`main`,{
        children:[
          (0,m.jsx)(C,{
            
          }),(0,m.jsx)(w,{
            
          }),(0,m.jsx)(T,{
            
          }),(0,m.jsx)(E,{
            
          }),(0,m.jsx)(D,{
            
          }),(0,m.jsx)(O,{
            
          })
        ]
      }),(0,m.jsx)(f,{
        
      })
    ]
  })
}export{
  k as default
};

//# sourceMappingURL=page-C7Q6OsRV.js.map