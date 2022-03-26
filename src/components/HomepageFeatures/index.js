import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Vue',
    img: require('./images/vue.png').default,
    description: (
      <>
        從2到現在3都有，會運用到store與router，偶爾偶爾會聊聊nuxt。
      </>
    ),
  },
  {
    title: 'css',
    Svg: require('./images/twind.svg').default,
    description: (
      <>
        長期使用styled-component，目前開發上主要使用twind，可以在這裡找到些css排版的黑魔法。
      </>
    ),
  },
  {
    title: 'linux',
    img: require('./images/manjaro.png').default,
    description: (
      <>
        最近開始接觸linux，使用manjaro作為體驗，覺得靈活度高到驚訝。
      </>
    ),
  },
];

function Feature({Svg, img, title, description}) {
  const images = Svg
    ? <Svg className={styles.featureImg} role="img" />
    : <img className={styles.featureImg} src={img} role="img"/>

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {images}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">在這裡可以看到...</div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
