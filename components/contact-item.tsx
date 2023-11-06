/** @jsxImportSource @emotion/react */
// import React from "react";
import { IContact } from "@/helpers/contact-helper";
import {
  ButtonFullwidth,
  ButtonIcon,
  ContactDetails,
  ContactInfo,
  ContactItemStyled,
  ContactItemWrapper,
  ContactName,
  DeleteIcon,
  FavoriteFilledIcon,
  FavoriteIcon,
  GreenAccent,
  InnerButtonOutline,
} from "@/styles/styled";

interface IContactItemProps {
  contact: IContact;
  onFavorite?: () => void;
  onDelete: () => void;
  onRemoveFav?: () => void;
  onViewDetail?: () => void;
  variant: "default" | "favorite";
}
const ContactItem = ({
  contact,
  variant,
  onFavorite,
  onDelete,
  onRemoveFav,
  onViewDetail,
}: IContactItemProps) => {
  const handleFavorite = (e: any) => {
    e.stopPropagation();
    onFavorite && onFavorite();
  };
  const handleRemoveFav = (e: any) => {
    e.stopPropagation();
    onRemoveFav && onRemoveFav();
  };
  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete();
  };

  const isFavorite = variant == "favorite";
  return (
    <>
      <div>
        <ContactItemWrapper onClick={onViewDetail}>
          <ContactItemStyled>
            <ContactInfo>
              <div>
                <ContactName>
                  {contact.first_name} {contact.last_name}
                </ContactName>
                <ContactDetails>
                  {contact.phones?.map((phone, index: number) => (
                    <div key={contact.id + index}>{phone.number}</div>
                  ))}
                </ContactDetails>
              </div>
            </ContactInfo>
            <div>
              {isFavorite ? (
                <ButtonIcon onClick={handleRemoveFav}>
                  <FavoriteFilledIcon />
                </ButtonIcon>
              ) : (
                <>
                  <ButtonIcon onClick={handleDelete}>
                    <DeleteIcon />
                  </ButtonIcon>
                  <ButtonIcon onClick={handleFavorite}>
                    <FavoriteIcon />
                  </ButtonIcon>
                </>
              )}
            </div>
          </ContactItemStyled>
          {!isFavorite && (
            <ButtonFullwidth>
              <InnerButtonOutline>Ubah Kontak</InnerButtonOutline>
            </ButtonFullwidth>
          )}
          <GreenAccent />
        </ContactItemWrapper>
      </div>
    </>
  );
};

export default ContactItem;
