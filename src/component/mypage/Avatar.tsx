import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import domtoimage from 'dom-to-image';
import { ReactComponent as DownIcon } from '../../assets/icon/DownIcon.svg';
import { ReactComponent as UpIcon } from '../../assets/icon/UpIcon.svg';
import { ReactComponent as MaleIcon } from '../../assets/icon/MaleIcon.svg';
import { ReactComponent as FemaleIcon } from '../../assets/icon/FemaleIcon.svg';
import { ReactComponent as ResetIcon } from '../../assets/icon/ResetIcon.svg';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

type AvatarProps = {
  showItemBox: boolean;
  selected: boolean;
  selectedMenuIndex: number;
  avatarSaveImg: string;
  saving: boolean;
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
      Images('./E5_M.png'),
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

const baseURL =
  'http://ec2-13-209-15-210.ap-northeast-2.compute.amazonaws.com:8080';

const token = localStorage.getItem('token');

const Avatar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const [showItemBox, setShowItemBox] = useState(false);
  const [selected, setSelected] = useState(false);
  const [avatarImg, setAvatarImg] = useState(Images('./M_Avatar.png')); // 아바타 성별
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0); // 카테고리 인덱스
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 아바타에 적용될 옷
  const [inventory, setInventory] = useState<string[][]>([]); // 인벤토리 카테고리별 관리
  const [showAvatarInit, setShowAvatarInit] = useState(true); // 초기 아바타 모습
  const [selectedImagesinit, setSelectedImagesinit] = useState<string[]>([]); // 초기 아바타 적용 옷
  const [inventoryinit, setInventoryinit] = useState<string[][]>([]); // 초기 인벤토리
  const selectedMenu = ItemMenu[selectedMenuIndex];
  const [saveButtonText, setSaveButtonText] = useState<string>('저장하기');
  const [saving, setSaving] = useState(false); // 저장중 상태
  // 아바타 최종 모습 이미지로 저장
  const captureRef = useRef<HTMLDivElement>(null);
  const [avatarSaveImg, setAvatarSaveImg] = useState<string>('');
  const [selectedImageArray, setSelectedImageArray] = useState<
    (string | undefined)[]
  >(Array(4).fill(undefined));
  const [inventoryImageArray, setInventoryImageArray] = useState<
    (string | undefined)[]
  >(Array(4).fill(undefined));

  const MenuClickHandler = (menuIndex: number): void => {
    setSelectedMenuIndex(menuIndex);
  };

  const ImageButtonClickHandler = (imageIndex: number): void => {
    setShowAvatarInit(false);
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

    // console.log('현재 착용된: ', updatedSelectedImages);

    // 아이템 이미지 URL 배열
    const selectedImageArray: (string | '')[] = ItemMenu.map((menu, index) => {
      if (index === selectedMenuIndex) {
        return ItemMenu[selectedMenuIndex].images[imageIndex];
      }
      return updatedSelectedImages[index];
    });
    // 인벤 이미지 URL 배열
    const inventoryImageArray: (string | '')[] = ItemMenu.map((menu, index) => {
      if (index === selectedMenuIndex) {
        return ItemMenu[selectedMenuIndex].buttonImages[imageIndex];
      }
      return updatedInventory[index];
    });
    setSelectedImageArray(selectedImageArray);
    setInventoryImageArray(inventoryImageArray);
    // console.log('아이템url배열: ', selectedImageArray);
    // console.log('인벤url배열: ', inventoryImageArray);
  };

  const ItemBoxHandler = () => {
    setShowItemBox((prevState) => !prevState);
  };

  const SexBtnHandler = () => {
    setShowAvatarInit(false);

    setSelected((prevSelected) => !prevSelected);
    const newAvatarImg = selected
      ? Images('./M_Avatar.png')
      : Images('./W_Avatar.png');
    setAvatarImg(newAvatarImg);

    const E5_W_Image = Images('./E5_W.png');
    const E5_M_Image = Images('./E5_M.png');

    const updatedImages = [...ItemMenu];
    // 성별에 따라 소품 '안경' 이미지 변경
    updatedImages[3].images[4] = selected ? E5_M_Image : E5_W_Image;
    // 아이템도 초기화
    setSelectedImages([]);
    setInventory([]);
  };

  const ResetHandler = () => {
    setSelectedImages([]);
    setInventory([]);
    setSelectedImagesinit([]);
    setInventoryinit([]);
  };

  const SaveHandler = async () => {
    if (saving) {
      return; // 이미 저장 중인 경우 중복 요청 막음
    }

    // 아이템 변경 없이 저장하기 클릭 시
    setSaveButtonText('저장 완료!');

    // 아이템 변경 후 저장
    if (selectedImageArray.some((image) => image !== undefined)) {
      setSaving(true);
      setSaveButtonText('저장 중..');
      if (captureRef.current) {
        const dataUrl = await domtoimage.toJpeg(captureRef.current, {
          quality: 1,
          width: 700,
          height: 500,
          style: {
            position: 'absolute',
            transform: 'translate(-4.6%, -2.5%)',
            backgroundColor: '#e4ebfa'
          }
        });

        // 아바타 최종 이미지 FormData 변환 + cody/all 연동
        const avatarSaveImg = dataUrl;
        const avatarImgFormData = new FormData();
        const blob = await fetch(avatarSaveImg).then((r) => r.blob()); // 이미지 데이터를 Blob으로 변환
        avatarImgFormData.append('file', blob, 'file');
        /* avatarImgFormData.forEach((value, key) => {
          console.log(key, value);
        }); */
        try {
          const response = await axios.post(
            `${baseURL}/cody/all`,
            avatarImgFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const responseData = response.data;
          console.log('all Response Data : ', responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        // 아바타 상태 이미지 FormData 변환 + cody/image 연동
        interface ImageDataObject {
          [key: string]: Blob | File;
        }
        const avatarInfoFormData = new FormData();
        const imageArray: ImageDataObject[] = [];

        for (let i = 0; i < 4; i++) {
          const imageName = ['top', 'bottom', 'shoes', 'acc'][i];
          const itemImageName = ['topmin', 'bottommin', 'shoesmin', 'accmin'][
            i
          ];
          imageArray.push({
            [itemImageName]: new Blob([''], { type: 'image/png' })
          });

          if (selectedImageArray[i] !== undefined) {
            const imageUrl = selectedImageArray[i] || '';
            const response = await fetch(imageUrl);
            const buffer = await response.arrayBuffer(); // 데이터를 ArrayBuffer로 변환
            const base64String = btoa(
              new Uint8Array(buffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            const dataUrl = `data:image/png;base64,${base64String}`; // 데이터 URL 변환
            const imageBlob = await fetch(dataUrl).then((r) => r.blob());
            avatarInfoFormData.append(imageName, imageBlob, 'image');
            const imageObject: ImageDataObject = {};
            imageObject[imageName] = imageBlob;
            imageArray.push(imageObject);
            console.log('아이템배열값: ', selectedImageArray[i]);
          } else {
            imageArray.push({
              [imageName]: new Blob([''], { type: 'image/png' })
            });
          }

          if (inventoryImageArray[i] !== undefined) {
            const itemImageUrl = inventoryImageArray[i] || '';
            const itemResponse = await fetch(itemImageUrl);
            const itemBuffer = await itemResponse.arrayBuffer();
            const itemBase64String = btoa(
              new Uint8Array(itemBuffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            const itemDataUrl = `data:image/png;base64,${itemBase64String}`; // 데이터 URL 변환
            const itemImageBlob = await fetch(itemDataUrl).then((r) =>
              r.blob()
            );
            avatarInfoFormData.append(itemImageName, itemImageBlob, 'image');
            const itemImageObject: ImageDataObject = {};
            itemImageObject[itemImageName] = itemImageBlob;
            imageArray.push(itemImageObject);
            console.log('인벤배열값: ', inventoryImageArray[i]);
          } else {
            imageArray.push({
              [itemImageName]: new Blob([''], { type: 'image/png' })
            });
          }
        }
        avatarInfoFormData.append('imageArray', JSON.stringify(imageArray));

        const gender = selected;
        const params = {
          gender: gender
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: params
        };
        try {
          const response = await axios.post(
            `${baseURL}/cody/image`,
            avatarInfoFormData,
            config
          );
          setSaving(false);
          setSaveButtonText('저장 완료!');
          setTimeout(() => {
            setSaveButtonText('저장하기');
          }, 1000);
          console.log('image Response Data:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/cody/getall`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = response.data;
        // console.log('GET 아바타 데이터:', responseData);

        const gender = responseData.data.gender;
        setAvatarImg(
          gender === true ? Images('./W_Avatar.png') : Images('./M_Avatar.png')
        );
        setSelected(gender === true ? true : false);
        const E5_W_Image = Images('./E5_W.png');
        const E5_M_Image = Images('./E5_M.png');
        const updatedImages = [...ItemMenu];
        // 성별에 따라 소품 '안경' 이미지 변경
        updatedImages[3].images[4] = gender ? E5_W_Image : E5_M_Image;
        // console.log('GET 성별:', gender);

        if (responseData) {
          setSelectedImagesinit([
            responseData.data.topimg,
            responseData.data.bottomimg,
            responseData.data.shoesimg,
            responseData.data.accimg
          ]);
          // console.log('이미지 : ', selectedImagesinit);

          setInventoryinit([
            [responseData.data.topminimg],
            [responseData.data.bottomminimg],
            [responseData.data.shoesminimg],
            [responseData.data.accminimg]
          ]);
          // console.log('인벤 : ', inventoryinit);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('연동 오류');
      }
    };

    fetchData();
  }, []);

  return (
    <AvatarContainer>
      <AvatarBox>
        <AvatarCaptureBox ref={captureRef} avatarSaveImg={avatarSaveImg}>
          <AvatarImgBox showItemBox={showItemBox}>
            <img src={avatarImg} alt='avatar' width='125%' />
            {showAvatarInit &&
              selectedImagesinit.length > 0 &&
              selectedImagesinit.map((image, index) => (
                <SelectedImage
                  key={index}
                  src={image}
                  selectedMenuIndex={index}
                />
              ))}
            {!showAvatarInit &&
              selectedImages.length > 0 &&
              selectedImages.map((image, index) => (
                <SelectedImage
                  key={index}
                  src={image}
                  selectedMenuIndex={index}
                />
              ))}
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
              {showAvatarInit &&
                ItemMenu.map((_, index) => (
                  <Inventory
                    key={index}
                    style={{
                      backgroundImage:
                        inventoryinit.length > index
                          ? `url(${inventoryinit[index]})`
                          : ''
                    }}
                  />
                ))}
              {!showAvatarInit &&
                ItemMenu.map((_, index) => (
                  <Inventory
                    key={index}
                    style={{
                      backgroundImage:
                        inventory.length > index
                          ? `url(${inventory[index]})`
                          : ''
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
                style={isMobile ? FONT.M3 : FONT.H4}
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
          <SaveBtn
            onClick={SaveHandler}
            saving={saving}
            style={{ pointerEvents: saving ? 'none' : 'auto' }}
          >
            <div style={isMobile ? FONT.H5 : FONT.H4}>{saveButtonText}</div>
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
  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
    margin-right: 0;
    margin-bottom: 40px;
  }
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
  @media (max-width: 500px) {
    width: 90vw;
    max-width: 664px;
    height: 390px;
  }
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
  @media (max-width: 500px) {
    top: ${(props) => (props.showItemBox ? '47%' : '55%')};
    width: 30%;
    transform: translate(-52%, -53%);
  }
`;
/* 아바타 최종 캡쳐 화면 */
const AvatarCaptureBox = styled.div<Pick<AvatarProps, 'avatarSaveImg'>>`
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
  @media (max-width: 500px) {
    margin-bottom: ${(props) => (props.showItemBox ? '69px' : '20px')};
    width: 50px;
    height: 47px;
  }
`;
const SettingContainer = styled.div`
  position: relative;
  border-radius: 40px;
  width: 100vw;
  max-width: 764px;
  height: 590px;
  padding: 45px;
  @media (max-width: 500px) {
    padding: 20px;
  }
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
  @media (max-width: 500px) {
    width: 75px;
    height: 28px;
    margin-left: 20px;
  }
`;
const SexIcon = styled.div<Pick<AvatarProps, 'selected'>>`
  width: 57px;
  height: 34px;
  border-radius: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? 'white' : props.theme.Blue_Main};
  svg {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 47px;
    height: 22px;
    > svg {
      width: 60%;
      height: 60%;
    }
  }
`;
/* 인벤토리 */
const InventoryBox = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    right: 40px;
  }
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
  @media (max-width: 500px) {
    z-index: 1;
    width: 39px;
    height: 37px;
    margin-bottom: 5px;
  }
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
  @media (max-width: 500px) {
    width: 36px;
    height: 34px;
    right: 40px;
    > svg {
      width: 90%;
      height: 90%;
    }
  }
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
  margin: -60px 0 120px 0;
  padding: 50px;
  @media (max-width: 500px) {
    width: 90vw;
    max-width: 664px;
    height: 320px;
    padding: 30px 30px 10px 30px;
    margin-bottom: 10px;
  }
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
  @media (max-width: 500px) {
    margin-left: -13px;
  }
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
  @media (max-width: 500px) {
    width: 77px;
    height: 78px;
    background-size: 75%;
    margin: -13px 7px 25px 7px;
    border-radius: 10px;
  }
`;
const SaveBtn = styled.button<Pick<AvatarProps, 'saving'>>`
  display: flex;
  position: absolute;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  border: none;
  background-color: ${(props) =>
    props.saving ? props.theme.Blue_Gradient_01 : props.theme.Blue_Main};
  width: 248px;
  height: 56px;
  bottom: 20px;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 30px;
  @media (max-width: 500px) {
    width: 160px;
    height: 36px;
    bottom: -10px;
  }
`;
