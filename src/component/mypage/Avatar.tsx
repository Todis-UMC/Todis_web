import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as DownIcon } from '../../assets/icon/DownIcon.svg';
import { ReactComponent as UpIcon } from '../../assets/icon/UpIcon.svg';
import { ReactComponent as MaleIcon } from '../../assets/icon/MaleIcon.svg';
import { ReactComponent as FemaleIcon } from '../../assets/icon/FemaleIcon.svg';
import { ReactComponent as ResetIcon } from '../../assets/icon/ResetIcon.svg';

type AvatarProps = {
  showItemBox: boolean;
  selected: boolean;
  selectedMenuIndex: number;
};

const Imges = require.context('../../assets/img/avatar', true, /\.png$/);

const ItemMenu = [
  {
    id: 1,
    label: '상의',
    images: [Imges('./top1.png')],
    buttonImages: [Imges('./Pv_top1.png')]
  },
  {
    id: 2,
    label: '하의',
    images: [Imges('./btm1.png')],
    buttonImages: [Imges('./Pv_btm1.png')]
  },
  {
    id: 3,
    label: '신발',
    images: [Imges('./shoes1.png')],
    buttonImages: [Imges('./Pv_shoes1.png')]
  },
  {
    id: 4,
    label: '악세사리',
    images: [],
    buttonImages: []
  }
];

const Avatar = () => {
  const [showItemBox, setShowItemBox] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [inventory, setInventory] = useState<string[][]>([]);
  const selectedMenu = ItemMenu[selectedMenuIndex];
  const [saveButtonText, setSaveButtonText] = useState<string>('저장하기');

  const handleMenuClick = (menuIndex: number): void => {
    setSelectedMenuIndex(menuIndex);
  };

  const handleImageButtonClick = (imageIndex: number): void => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[selectedMenuIndex] =
      ItemMenu[selectedMenuIndex].images[imageIndex];
    setSelectedImages(updatedSelectedImages);

    // 카테고리별 인벤토리 관리
    const updatedInventory = [...inventory];
    updatedInventory[selectedMenuIndex] = [
      ...(updatedInventory[selectedMenuIndex] || [])
    ];
    updatedInventory[selectedMenuIndex][0] =
      ItemMenu[selectedMenuIndex].buttonImages[imageIndex];
    setInventory(updatedInventory);
  };

  const ItemBoxHandler = () => {
    setShowItemBox((prevState) => !prevState);
  };

  const SexBtnHandler = () => {
    /* 성별에 따른 아바타 적용 */
    setSelected((prevState) => !prevState);
  };

  const ResetHandler = () => {
    setSelectedImages([]);
    setInventory([]);
  };

  const SaveHandler = () => {
    try {
      localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
      localStorage.setItem('inventory', JSON.stringify(inventory));
      setSaveButtonText('저장 완료!');
    } catch (error) {
      setSaveButtonText('저장 실패!');
    }

    setTimeout(() => {
      setSaveButtonText('저장하기');
    }, 1000);
  };

  useEffect(() => {
    if (selectedImages.length === 0) {
      const initialSelectedImages = ItemMenu.map(() => '');
      setSelectedImages(initialSelectedImages);
    }

    const savedselectedImages = localStorage.getItem('selectedImages');
    const savedInventory = localStorage.getItem('inventory');
    setSelectedImages(
      savedselectedImages ? JSON.parse(savedselectedImages) : selectedImages
    );
    setInventory(
      savedInventory ? JSON.parse(savedInventory) : inventory[selectedMenuIndex]
    );
  }, []);

  return (
    <AvatarContainer>
      <AvatarBox>
        {showItemBox && (
          <SettingContainer>
            <SexBtnBox>
              <SexIcon selected={selected}>
                <MaleIcon onClick={SexBtnHandler} />
              </SexIcon>
              <SexIcon selected={!selected}>
                <FemaleIcon onClick={SexBtnHandler} />
              </SexIcon>
            </SexBtnBox>
            <InventoryBox>
              {ItemMenu.map((menu, index) => (
                <Inventory
                  key={index}
                  style={{
                    backgroundImage:
                      inventory.length > index ? `url(${inventory[index]})` : ''
                  }}
                />
              ))}
            </InventoryBox>
            <ResetBtn onClick={ResetHandler}>
              <ResetIcon />
            </ResetBtn>
          </SettingContainer>
        )}
        <AvatarImgBox showItemBox={showItemBox}>
          <img src={Imges('./W_Avatar.png')} alt='avatar' width='110%' />
          {selectedImages.filter(Boolean).map((image, index) => (
            <SelectedImage
              key={index}
              src={image}
              alt='Selected Image'
              selectedMenuIndex={index}
            />
          ))}
        </AvatarImgBox>
        <UpDownBtn onClick={ItemBoxHandler} showItemBox={showItemBox}>
          {showItemBox ? <UpIcon /> : <DownIcon />}
        </UpDownBtn>
      </AvatarBox>
      {showItemBox && (
        <ItemBox showItemBox={showItemBox}>
          <MenuItemBox>
            {ItemMenu.map((menu, index) => (
              <MenuItem
                key={menu.id}
                onClick={() => handleMenuClick(index)}
                selected={selectedMenuIndex === index}
                style={FONT.H4}
              >
                {menu.label}
              </MenuItem>
            ))}
          </MenuItemBox>
          <ImageButtonsContainer>
            {selectedMenu &&
              selectedMenu.buttonImages.map((buttonImage, index) => (
                <ImageButton
                  key={index}
                  style={{ backgroundImage: `url(${buttonImage})` }}
                  onClick={() => handleImageButtonClick(index)}
                />
              ))}
          </ImageButtonsContainer>
          <SaveBtn onClick={SaveHandler}>
            <div style={FONT.H4}>{saveButtonText}</div>
          </SaveBtn>
        </ItemBox>
      )}
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 40px;
`;
const AvatarBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.SkyBlue_03};
  border-radius: 40px;
  width: 100vw;
  max-width: 764px;
  height: 590px;
  position: relative;
`;
/* 아바타 단독 이미지 */
const AvatarImgBox = styled.div<Pick<AvatarProps, 'showItemBox'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => (props.showItemBox ? '40%' : '45%')};
  transition: top 0.3s ease-in-out;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 15px;
`;
/* 아바타 위에 적용되는 아이템 이미지 */
const SelectedImage = styled.img<Pick<AvatarProps, 'selectedMenuIndex'>>`
  position: absolute;
  width: 110%;
  ${(props) =>
    props.selectedMenuIndex === 0 &&
    css`
      z-index: 2;
    `}
`;
const UpDownBtn = styled.button<Pick<AvatarProps, 'showItemBox'>>`
  display: flex;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  transition: margin-bottom 0.3s ease-in-out;
  margin-bottom: ${(props) => (props.showItemBox ? '80px' : '20px')};
`;
const SettingContainer = styled.div`
  position: relative;
  border-radius: 40px;
  width: 100vw;
  max-width: 764px;
  height: 590px;
  padding: 45px;
`;
/* 성별 */
const SexBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 68px;
  border: none;
  width: 114px;
  height: 38px;
  margin-left: 10px;
  padding: 0px 3px;
  position: absolute;
`;
const SexIcon = styled.div<Pick<AvatarProps, 'selected'>>`
  width: 57px;
  height: 34px;
  border-radius: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? props.theme.Blue_Main : 'white'};
  svg {
    cursor: pointer;
  }
`;
/* 인벤토리 */
const InventoryBox = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  flex-direction: column;
`;
const Inventory = styled.div`
  width: 49px;
  height: 47px;
  border-radius: 9px;
  background-color: white;
  margin-bottom: 10px;
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
`;
/* 리셋 */
const ResetBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 48px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background-color: white;
  position: absolute;
  bottom: 20px;
  right: 50px;
`;
/* 아이템 */
const ItemBox = styled.div<Pick<AvatarProps, 'showItemBox'>>`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  border-radius: 40px;
  width: 100vw;
  max-width: 764px;
  height: 624px;
  margin-top: -60px;
  padding: 50px;
`;
const MenuItemBox = styled.div`
  display: flex;
  flex-direction: row;
`;
/* 카테고리 */
const MenuItem = styled.div<Pick<AvatarProps, 'selected'>>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
  cursor: pointer;
  margin-left: -20px;
  color: ${(props) => (props.selected ? props.theme.Blue_Main : 'black')};
`;
const ImageButtonsContainer = styled.div`
  display: flex;
  margin: 35px 0px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
/* 아이템 버튼 */
const ImageButton = styled.button`
  width: 145px;
  height: 146px;
  margin: 20px 30px 20px 30px;
  border: none;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  cursor: pointer;
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
`;
const SaveBtn = styled.button`
  display: flex;
  position: absolute;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  border: none;
  background-color: ${(props) => props.theme.Blue_Main};
  width: 248px;
  height: 56px;
  bottom: 20px;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 30px;
`;
