import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import PageHeader from '@/components/navbar/PageHeader';
import { Image, InputText, SmallButton } from '@/components/common';
import BottomNavigation from '@/components/navbar/BottomNavigation';
import AudioUpload from '@/components/model/AudioUpload';
import Modal from '@/components/common/Modal';
import ImageUpload from '@/components/model/ImageUpload';
import VideoUpload from '@/components/model/VideoUpload';
import TextUpload from '@/components/model/TextUpload';
import { modelCreate } from '@/api/create';
import { getPeopleInfo } from '@/api/peoplelist';
import { ModelInformation } from '@/types/peopleList';
import { ModelConversation } from '@/types/board';
import { getVideos } from '@/api/board';
import VideoListItem from '@/components/profile/VideoListItem';
import VideoContent from '@/components/profile/VideoContent';
import { VideoInformation } from '@/types/upload';

const CreateWrapper = styled.div`
  padding-bottom: 5.25rem;
`;

const HeaderBackGround = styled.div`
  top: 0;
  position: absolute;
  width: 100%;
  height: 12.5rem;
  background-color: var(--primary-color);
  z-index: -200;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const Title = styled.div`
  font-size: 1.825rem;
  font-weight: 600;
  width: fit-content;
  margin: 1rem auto;
`;

const ImageWrapper = styled.div`
  margin: 2rem auto 0 auto;
  width: fit-content;
`;

const StautsWrapper = styled.div`
  box-sizing: border-box;
  margin: 1rem auto;
  width: 86vw;
  height: 3.75rem;
  border-radius: 100px;
  border: 1px solid #ebebeb;
  background-color: #f6f6f6;
  display: flex;
  flex-wrap: nowrap;
`;

const StatusButton = styled.button`
  margin: 2px 1.5px;
  padding: 0.825rem 0;
  width: 46vw;
  border: 0;
  border-radius: 100px;
  font-size: 1rem;
  color: #bdbdbd;
  background-color: #f6f6f6;
`;

const StatusActiveButton = styled(StatusButton)`
  color: var(--primary-color);
  font-weight: 700;
  background-color: #fff;
`;

const TableWrapper = styled.div`
  width: 86vw;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  margin: 0 auto;
  width: 84vw;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .active {
    color: #fff;
  }
`;

const ModelProfile = () => {
  const headerContent = {
    left: 'Back',
    title: 'Profile',
    right: 'Modify',
  };
  const { modelNo } = useParams();

  const { data: modelInfomation } = useQuery<ModelInformation>(
    ['getModelInfo'],
    () => getPeopleInfo(Number(modelNo)),
  );
  console.log(modelInfomation);

  const { data: videoLists } = useQuery<ModelConversation[]>(
    ['getModelConversationList'],
    () => getVideos(Number(modelNo)),
  );
  console.log(videoLists);

  const [videoInformation, setVideoInformation] = useState<VideoInformation>({
    videoSrc: '',
    videoName: '',
  });

  const [tableStatus, setTableStatus] = useState<boolean>(false);

  // Modal 관련 state 및 함수
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isVideoPlayerModal, setIsVideoPlayerModal] = useState<boolean>(false);
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [isAudioModal, setIsAudioModal] = useState<boolean>(false);
  const [isVideoModal, setIsVideoModal] = useState<boolean>(false);
  const [isTalkModal, setIsTalkModal] = useState<boolean>(false);
  const handleOpenAudio = () => {
    setIsAudioModal(true);
    setIsModal(true);
  };
  const handleOpenImage = () => {
    setIsModal(true);
    setIsImageModal(true);
  };
  const handleOpenVideo = () => {
    setIsModal(true);
    setIsVideoModal(true);
  };
  const handleOpenTalk = () => {
    setIsModal(true);
    setIsTalkModal(true);
  };
  const handleCloseModal = () => {
    setIsAudioModal(false);
    setIsModal(false);
    setIsImageModal(false);
    setIsVideoModal(false);
    setIsTalkModal(false);
    setIsVideoPlayerModal(false);
  };

  return (
    <CreateWrapper>
      <HeaderBackGround />
      <TitleWrapper>
        <PageHeader content={headerContent} type={2} />
        <ImageWrapper>
          <Image
            src={
              modelInfomation ? modelInfomation.imagePath : '/dummy/갱얼쥐.jpg'
            }
          />
        </ImageWrapper>
      </TitleWrapper>
      <Title>{modelInfomation && modelInfomation.modelName}</Title>
      <StautsWrapper onClick={() => setTableStatus(!tableStatus)}>
        {tableStatus === true ? (
          <>
            <StatusButton>저장 내역</StatusButton>
            <StatusActiveButton>대화 내역</StatusActiveButton>
          </>
        ) : (
          <>
            <StatusActiveButton>저장 내역</StatusActiveButton>
            <StatusButton>대화 내역</StatusButton>
          </>
        )}
      </StautsWrapper>
      {tableStatus ? (
        <TableWrapper>
          {videoLists &&
            videoLists.map((item) => {
              return (
                <VideoListItem
                  key={item.proVideoNo}
                  {...item}
                  setIsVideoPlayerModal={setIsVideoPlayerModal}
                  setVideoInformation={setVideoInformation}
                  setIsModal={setIsModal}
                />
              );
            })}
        </TableWrapper>
      ) : (
        <ButtonWrapper>
          <SmallButton text="음성 목록" onClick={handleOpenAudio} />
          <SmallButton text="영상 목록" onClick={handleOpenVideo} />
          <SmallButton text="대화 목록" onClick={handleOpenTalk} />
          <SmallButton text="사진 목록" onClick={handleOpenImage} />
        </ButtonWrapper>
      )}
      {isModal && (
        <Modal onClose={handleCloseModal}>
          {isVideoPlayerModal && (
            <VideoContent
              videoInformation={videoInformation}
              handleCloseModal={handleCloseModal}
            />
          )}
          {/* {isAudioModal && (
            <AudioUpload
              currentAudioFiles={audioFiles}
              setCurrentAudioFiles={setAudioFiles}
            />
          )}
          {isImageModal && (
            <ImageUpload
              currentImage={imageFile}
              setCurrentImage={setImageFile}
            />
          )}
          {isVideoModal && (
            <VideoUpload
              currentVideoFiles={videioFiles}
              setCurrentVideoFiles={setVideoFiles}
            />
          )}
          {isTalkModal && (
            <TextUpload
              kakaoName={kakaoName}
              setKakaoName={setKakaoName}
              currentTextFiles={textFiles}
              setCurrentTextFiles={setTextFiles}
            />
          )} */}
        </Modal>
      )}
      <BottomNavigation />
    </CreateWrapper>
  );
};

export default ModelProfile;