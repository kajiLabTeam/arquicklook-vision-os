'use client';

import React, { FC, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Card from './_components/Card';
import Mobile from './_components/Mobile';
import Popup from './_components/Popup';
import demo from './_components/i18n/demo';
import { SolidObject } from '@/src/types/SolidObject';

const CardContainer = styled.div<{ $isChose: string }>`
  margin: 0 10%;
  padding: 75px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
  opacity: ${(props) => (props.$isChose === 'true' ? '0.4' : '1')};

  @media screen and (max-width: 1400px) {
    margin: 0 50px;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Gallery: FC = () => {
  const [isSmartphone, setIsSmartphone] = useState<boolean>(false);
  const [isChose, setChose] = useState<boolean>(false);
  const [itemId, setId] = useState<string>('');
  const [chosenItem, setItem] = useState<SolidObject>(demo[0]);
  const choseItem = (id: string) => {
    setId(id);
    setChose(true);
  };

  useEffect(() => {
    const foundItem = demo.find((item: SolidObject) => item.id === itemId);
    if (foundItem) {
      setItem(foundItem);
    }
    if (navigator.userAgent.match(/(iPhone|iPod|Android)/i)) {
      setIsSmartphone(true);
    }
  }, [itemId]);

  if (isSmartphone) {
    return <Mobile items={demo} />;
  }

  return (
    <>
      {isChose && (
        <>
          <Background onClick={() => setChose(false)} />
          <Popup item={chosenItem} setChose={setChose} />
        </>
      )}
      <CardContainer $isChose={isChose.toString()}>
        {demo.map((item: SolidObject) => {
          return <Card key={item.id} item={item} choseItem={choseItem} />;
        })}
      </CardContainer>
    </>
  );
};

export default Gallery;
