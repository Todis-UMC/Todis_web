import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import FONT from '../../styles/Font';
import domtoimage from 'dom-to-image';
import { ReactComponent as DownIcon } from '../../assets/icon/DownIcon.svg';
import { ReactComponent as UpIcon } from '../../assets/icon/UpIcon.svg';
import { ReactComponent as MaleIcon } from '../../assets/icon/MaleIcon.svg';
import { ReactComponent as FemaleIcon } from '../../assets/icon/FemaleIcon.svg';
import { ReactComponent as ResetIcon } from '../../assets/icon/ResetIcon.svg';

type AvatarProps = {
  showItemBox: boolean;
  selected: boolean;
  selectedMenuIndex: number;
  avatarSaveArray: string[];
};

const Images = require.context('../../assets/img/avatar', true, /\.png$/);

const ItemMenu = [
  {
    id: 1,
    label: '상의',
    images: [
      Images('./T1_knit.png'),
      Images('./T2_long.png'),
      Images('./T3_sleeveless.png'),
      Images('./T4_short.png'),
      Images('./T5_shirt.png'),
      Images('./T6_hoodie.png')
    ],
    buttonImages: [
      Images('./preview/Pv_T1.png'),
      Images('./preview/Pv_T2.png'),
      Images('./preview/Pv_T3.png'),
      Images('./preview/Pv_T4.png'),
      Images('./preview/Pv_T5.png'),
      Images('./preview/Pv_T6.png')
    ]
  },
  {
    id: 2,
    label: '하의',
    images: [
      Images('./B1_long.png'),
      Images('./B2_longskirt.png'),
      Images('./B3_short.png'),
      Images('./B4_shortskirt.png'),
      Images('./B5_jeans.png'),
      Images('./B6_training.png')
    ],
    buttonImages: [
      Images('./preview/Pv_B1.png'),
      Images('./preview/Pv_B2.png'),
      Images('./preview/Pv_B3.png'),
      Images('./preview/Pv_B4.png'),
      Images('./preview/Pv_B5.png'),
      Images('./preview/Pv_B6.png')
    ]
  },
  {
    id: 3,
    label: '신발',
    images: [
      Images('./S1_loafer.png'),
      Images('./S2_boots.png'),
      Images('./S3_sandal.png'),
      Images('./S4_slipper.png'),
      Images('./S5_sneakers.png'),
      Images('./S6_flat.png')
    ],
    buttonImages: [
      Images('./preview/Pv_S1.png'),
      Images('./preview/Pv_S2.png'),
      Images('./preview/Pv_S3.png'),
      Images('./preview/Pv_S4.png'),
      Images('./preview/Pv_S5.png'),
      Images('./preview/Pv_S6.png')
    ]
  },
  {
    id: 4,
    label: '악세사리',
    images: [
      Images('./E1_mask.png'),
      Images('./E2_hat.png'),
      Images('./E3_sunglasses.png'),
      Images('./E4_watch.png'),
      Images('./E5_W.png'),
      Images('./E6_umbrella.png')
    ],
    buttonImages: [
      Images('./preview/Pv_E1.png'),
      Images('./preview/Pv_E2.png'),
      Images('./preview/Pv_E3.png'),
      Images('./preview/Pv_E4.png'),
      Images('./preview/Pv_E5.png'),
      Images('./preview/Pv_E6.png')
    ]
  }
];

const Avatar = () => {
  const [showItemBox, setShowItemBox] = useState(false);
  const [selected, setSelected] = useState(false);
  const [avatarImg, setAvatarImg] = useState(Images('./W_Avatar.png')); // 아바타 성별
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0); // 카테고리 인덱스
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 아바타에 적용될 옷
  const [inventory, setInventory] = useState<string[][]>([]); // 인벤토리 카테고리별 관리
  const selectedMenu = ItemMenu[selectedMenuIndex];
  const [saveButtonText, setSaveButtonText] = useState<string>('저장하기');
  // 아바타 최종 모습 이미지로 저장
  const captureRef = useRef<HTMLDivElement>(null);
  const [avatarSaveArray, setAvatarSaveArray] = useState<string[]>([]);

  const MenuClickHandler = (menuIndex: number): void => {
    setSelectedMenuIndex(menuIndex);
  };

  const ImageButtonClickHandler = (imageIndex: number): void => {
    const SameIndex =
      selectedImages[selectedMenuIndex] ===
      ItemMenu[selectedMenuIndex].images[imageIndex];

    const updatedInventory = [...inventory];
    const updatedSelectedImages = [...selectedImages];
    // 같은 아이템 두 번 클릭 시 옷 벗기기 (인벤토리 포함)
    updatedInventory[selectedMenuIndex] = [
      ...(SameIndex
        ? []
        : [ItemMenu[selectedMenuIndex].buttonImages[imageIndex]])
    ];
    updatedSelectedImages[selectedMenuIndex] = SameIndex
      ? undefined
      : ItemMenu[selectedMenuIndex].images[imageIndex];

    setInventory(updatedInventory);
    setSelectedImages(updatedSelectedImages);
  };

  const ItemBoxHandler = () => {
    setShowItemBox((prevState) => !prevState);
  };

  const SexBtnHandler = () => {
    setSelected((prevSelected) => !prevSelected);
    const newAvatarImg = selected
      ? Images('./W_Avatar.png')
      : Images('./M_Avatar.png');
    setAvatarImg(newAvatarImg);

    // 성별에 따른 아바타 및 성별토글 상태 저장
    localStorage.setItem('isFemale', selected ? 'true' : 'false');
    const saveSexToLocalStorage = (value: boolean) => {
      localStorage.setItem('selectedSex', JSON.stringify(value));
    };
    saveSexToLocalStorage(!selected);

    const E5_W_Image = Images('./E5_W.png');
    const E5_M_Image = Images('./E5_M.png');

    const updatedImages = [...ItemMenu];
    // 성별에 따라 소품 '안경' 이미지 변경
    if (selected) {
      updatedImages[3].images[4] = E5_W_Image;
    } else {
      updatedImages[3].images[4] = E5_M_Image;
    }
    // 아이템도 초기화
    setSelectedImages([]);
    setInventory([]);
  };

  const ResetHandler = () => {
    setSelectedImages([]);
    setInventory([]);
  };

  const SaveHandler = () => {
    try {
      localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
      localStorage.setItem('inventory', JSON.stringify(inventory));
      localStorage.setItem('newAvatarImg', JSON.stringify(avatarImg));

      // 아바타 최종 화면 캡쳐
      if (captureRef.current) {
        domtoimage
          .toPng(captureRef.current, {
            style: {
              position: 'absolute',
              transform: 'translate(-5%)',
              backgroundColor: '#e4ebfa'
            }
          })
          .then((dataUrl) => {
            setAvatarSaveArray((prevAvatarSaveArray) => [
              ...prevAvatarSaveArray,
              dataUrl
            ]);
            localStorage.setItem(
              'avatarSaveArray',
              JSON.stringify([...avatarSaveArray, dataUrl])
            );
          });
      }
      console.log('저장 성공');
      console.log(avatarSaveArray);
      setSaveButtonText('저장 완료!');
    } catch (error) {
      console.error('저장 실패', error);
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
    // 로컬스토리지에 저장된 아이템 이미지 가져오기
    const savedselectedImages = localStorage.getItem('selectedImages');
    const savedInventory = localStorage.getItem('inventory');
    // 로컬스토리지에 저장된 성별토글 상태와 아바타 가져오기 (초기상태-여자)
    const isFemale = localStorage.getItem('isFemale');
    setAvatarImg(
      isFemale === 'true'
        ? Images('./W_Avatar.png')
        : isFemale === 'false'
        ? Images('./M_Avatar.png')
        : Images('./W_Avatar.png')
    );
    const savedSelectedSex = localStorage.getItem('selectedSex');
    setSelected(savedSelectedSex === 'true');

    setSelectedImages(
      savedselectedImages ? JSON.parse(savedselectedImages) : selectedImages
    );
    setInventory(
      savedInventory ? JSON.parse(savedInventory) : ItemMenu.map(() => [])
    );
  }, []);

  return (
    <AvatarContainer>
      <AvatarBox>
        <AvatarCaptureBox ref={captureRef} avatarSaveArray={avatarSaveArray}>
          <AvatarImgBox showItemBox={showItemBox}>
            <img src={avatarImg} alt='avatar' width='125%' />
            {selectedImages.length > 0 &&
              selectedImages.map(
                (image, index) =>
                  image !== undefined && (
                    <SelectedImage
                      key={index}
                      src={image}
                      alt='Selected Image'
                      selectedMenuIndex={index}
                    />
                  )
              )}
          </AvatarImgBox>
        </AvatarCaptureBox>
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
              {ItemMenu.map((_, index) => (
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
                onClick={() => MenuClickHandler(index)}
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
                  onClick={() => ImageButtonClickHandler(index)}
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
  top: ${(props) => (props.showItemBox ? '50%' : '55%')};
  transition: top 0.3s ease-in-out;
  left: 51%;
  transform: translate(-50%, -50%);
`;
/* 아바타 최종 캡쳐 화면 */
const AvatarCaptureBox = styled.div<Pick<AvatarProps, 'avatarSaveArray'>>`
  display: flex;
  position: absolute;
  width: 700px;
  height: 83%;
  bottom: 15%;
`;
/* 아바타 위에 적용되는 아이템 이미지 */
const SelectedImage = styled.img<Pick<AvatarProps, 'selectedMenuIndex'>>`
  position: absolute;
  width: 125%;
  z-index: ${(props) =>
    props.selectedMenuIndex === 3
      ? 5
      : props.selectedMenuIndex === 1
      ? 2
      : props.selectedMenuIndex === 2
      ? 1
      : 3};
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
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
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
