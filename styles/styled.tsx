/** @jsxImportSource @emotion/react */
import { IPaginationStyledProps } from "@/components/pagination";
import { ITabStyledProps } from "@/components/tab";
import styled from "@emotion/styled";
import {
  FaRegStar,
  FaStar,
  FaTrashAlt,
  FaArrowLeft,
  FaIdBadge,
  FaPlus,
} from "react-icons/fa";

export const HeadingStyled = styled.h1`
  color: ${(props) => props.theme.colors.BK500};
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

export const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.NN300};
`;

export const ButtonTextStyled = styled.button`
  color: ${(props) => props.theme.colors.GN500};
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
`;

export const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 8px;
  border-radius: ${(props) => props.theme.radius};
  border-color: ${(props) => props.theme.colors.NN200};
  margin: 12px 16px;
`;

export const TabStyled = styled.button<ITabStyledProps>`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-bottom: 3px solid transparent;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-weight: 700;

  border-bottom: ${(props) => (props.isActive ? "3px solid green" : "none")};
  color: ${(props) => (props.isActive ? "green" : "grey")};

  &:hover {
    color: green;
  }
`;

export const TabContainerStyled = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;

export const ContactItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const ContactItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  padding: 10px;
  margin: 16px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.NN200};
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.GN50};
    border: 1px solid ${(props) => props.theme.colors.GN500};
  }
  z-index: 0;
`;

export const GreenAccent = styled.div`
  position: absolute;
  left: 0;
  top: 18px;
  border-radius: 0 8px 8px 0;
  width: 4px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.GN500};
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactName = styled.h2`
  font-size: 1rem;
  color: #333;
`;

export const ContactDetails = styled.div`
  color: #666;
`;

export const ContactActions = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
`;

export const InnerButtonOutline = styled.button`
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: 700;
  margin-top: 16px;
  background-color: white;
  color: ${(prop) => prop.theme.colors.BK50};
  &:hover {
    border-color: #888;
  }
`;

export const InnerButtonContain = styled.button`
  background: ${(prop) => prop.theme.colors.GN500};
  border: 1px solid #ccc;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: 700;
  margin-top: 16px;
  color: white;
  &:disabled {
    background-color: ${(prop) => prop.theme.colors.NN300};
  }
`;

export const ButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 4px;
  margin-top: 13px;
`;

export const FavoriteIcon = styled(FaRegStar)`
  color: green;
  &:hover {
    color: darkgreen;
  }
`;

export const FavoriteFilledIcon = styled(FaStar)`
  color: gold;
  &:hover {
    color: goldenrod;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  color: ${(props) => props.theme.colors.BK50};
  &:hover {
    color: ${(props) => props.theme.colors.GN500};
  }
`;

export const ButtonFullwidth = styled.div`
  width: 100%;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

export const PaginationButton = styled.button<IPaginationStyledProps>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.isCurrent ? props.theme.colors.GN500 : props.theme.colors.BK50};
  font-weight: ${(props) => (props.isCurrent ? "700" : "400")};
  padding: 5px 10px;
  &:hover {
    color: ${(props) => !props.isCurrent && props.theme.colors.BK500};
  }
  &:disabled {
    cursor: default;
    opacity: 80%;
  }
`;
export const CurrentPageText = styled.p`
  color: ${(props) => props.theme.colors.BK50};
  font-size: 12px;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  max-width: 500px;
  @media (max-width: 600px) {
    border-radius: 0;
    height: 100vh;
  }
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  @media (max-width: 600px) {
    margin: 20px 0;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 6px ${(props) => props.theme.colors.NN200};
  border-radius: 10px;
  padding: 15px;
  margin: 8px 0;
`;

export const ButtonTextSmall = styled.button`
  color: ${(props) => props.theme.colors.GN500};
  background-color: white;
  font-size: 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const BackButton = styled(FaArrowLeft)`
  cursor: pointer;
  margin-right: 10px;
  color: ${(props) => props.theme.colors.BK50};
  @media (min-width: 600px) {
    display: none;
  }
`;
export const CloseButton = styled(FaPlus)`
  cursor: pointer;
  margin-right: 10px;
  position: absolute;
  right: 0;
  transform: rotate(45deg);
  color: ${(props) => props.theme.colors.BK50};
  @media (max-width: 600px) {
    display: none;
  }
`;

export const LabelStyled = styled.label`
  font-size: 12px;
  color: ${(props) => props.theme.colors.BK50};
`;

export const NameStyled = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${(props) => props.theme.colors.BK50};
`;

export const ContactEditContainer = styled.div`
  background: #fff;
  padding: 16px;
  padding-left: 0;
  border-radius: 8px;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const InputPhoneGroup = styled.div`
  display: flex;
  align-items: center;
`;
export const InputPhoneWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  &:focus {
    border-bottom: 1px solid #4caf50;
  }
`;

export const PhoneNumberInput = styled(Input)`
  padding-right: 40px;
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
`;

export const ContactIcon = styled(FaIdBadge)`
  position: relative;
  transform: translateX(-24px);
`;

export const Divider = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

export const EmptyContact = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-top: 25%;
  align-items: center;
`;
