/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import { EDIT_QUERY } from "./../lib/queries";
import { IContact, IPhone } from "@/helpers/contact-helper";
import AddPhoneNumber from "./add-contact";
import { useRouter } from "next/router";
import {
  BackButton,
  ButtonFullwidth,
  ButtonTextSmall,
  CloseButton,
  ContactEditContainer,
  ContactIcon,
  FieldContainer,
  InnerButtonContain,
  Input,
  InputGroup,
  InputPhoneGroup,
  InputPhoneWrapper,
  InputWrap,
  Label,
  LabelStyled,
  NameStyled,
  PhoneNumberInput,
  PopupContainer,
  PopupOverlay,
  TitleBar,
} from "@/styles/styled";

interface IContactDetailPopupProps {
  contact: IContact;
  onClose: () => void;
  onContactUpdated: (phoneId: number, newNumber: any) => void;
  isFavorite: boolean;
}

const popupStyle = css`
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

const popupInnerStyle = css`
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

const ContactDetailPopup: React.FC<IContactDetailPopupProps> = ({
  isFavorite,
  contact,
  onClose,
  onContactUpdated,
}) => {
  const router = useRouter();
  const activeInputRef = useRef<any>(null);

  const [editName, setEditName] = useState(false);
  const [firstName, setFirstName] = useState(contact.first_name);
  const [lastName, setLastName] = useState(contact.last_name);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentContact, setCurrentContact] = useState(contact);
  const [addingNumber, setAddingNumber] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState(
    contact.phones?.map((phone) => phone.number)
  );

  const [updateContactName] = useMutation(EDIT_QUERY.CONTACT);
  const [updatePhoneNumber, { loading, error }] = useMutation(EDIT_QUERY.PHONE);

  const isEditing = editingIndex !== null || editName;

  const handleSaveName = async () => {
    try {
      const { data } = await updateContactName({
        variables: {
          id: currentContact.id,
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      setCurrentContact(data.update_contact_by_pk);
      setEditName(false);
      // router.reload()
    } catch (e) {
      console.error("Error updating contact name", e);
    }
  };

  const handlePhoneChange = (index: number, newNumber: any) => {
      const newPhoneNumbers = [...phoneNumbers];
      newPhoneNumbers[index] = `${newNumber}`;
      setPhoneNumbers(newPhoneNumbers);
  };

  const handleEdit = (index?: number) => {
    setEditingIndex(index ?? 0);
  };

  const handleSave = async (index: number) => {
    const newNumber = phoneNumbers[index];
    console.log(newNumber);
    try {
      const { data } = await updatePhoneNumber({
        variables: {
          pk_columns: {
            contact_id: currentContact.id as Number,
            number: currentContact.phones[index].number,
          },
          new_phone_number: newNumber,
        },
      });

      const updatedPhones = data.update_phone_by_pk.contact.phones;
      setPhoneNumbers(updatedPhones.map((phone: IPhone) => phone.number));
      setEditingIndex(null);
      let newNumbers = phoneNumbers.map((value) => {
        return { number: value };
      });
      onContactUpdated(index, newNumbers);
    } catch (e) {
      console.error("Error updating phone number", e);
    }
  };

  const handleCancel = () => {
    setPhoneNumbers(contact.phones.map((phone) => phone.number));
    setEditingIndex(null);
  };
  const handleNumberAdded = () => {
    router.reload();
  };

  const handleEditSave = () => {
    if (editName) {
      handleSaveName();
      return;
    }

    handleSave(editingIndex ?? 0);
  };

  useEffect(() => {
    if (editingIndex !== null && activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [editingIndex, phoneNumbers]);

  const renderNameFields = () => {
    if (editName) {
      return (
        <ContactEditContainer>
          <InputGroup>
            <InputWrap>
              <Label htmlFor="firstName">Nama depan</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputWrap>
            <InputWrap>
              <Label htmlFor="lastName">Nama Belakang</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputWrap>
            <ButtonTextSmall onClick={() => setEditName(false)}>
              Cancel
            </ButtonTextSmall>
          </InputGroup>
        </ContactEditContainer>
      );
    }
    return (
      <>
        <LabelStyled>Nama Lengkap</LabelStyled>
        <FieldContainer onClick={() => setEditName(true)}>
          <NameStyled>{`${currentContact.first_name} ${currentContact.last_name}`}</NameStyled>
          {!isFavorite && (
            <ButtonTextSmall >
              Ubah
            </ButtonTextSmall>
          )}
        </FieldContainer>
      </>
    );
  };

  const renderPhoneNumbers = () => {
    return phoneNumbers.map((phone, index: number) => (
      <div key={contact.first_name + phone + index}>
        {editingIndex === index ? (
          <>
            <ContactEditContainer>
              <InputPhoneWrapper>
                <InputPhoneGroup>
                  <PhoneNumberInput
                    type="number"
                    ref={editingIndex === index ? activeInputRef : null}
                    id={"phoneNumber-" + { editingIndex }}
                    value={phoneNumbers[editingIndex]}
                    placeholder="Contoh: 628121111"
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                  />
                  <ContactIcon />
                </InputPhoneGroup>
                <ButtonTextSmall onClick={handleCancel}>Cancel</ButtonTextSmall>
              </InputPhoneWrapper>
            </ContactEditContainer>
          </>
        ) : (
          <FieldContainer onClick={() => handleEdit(index)}>
            <NameStyled>{`${phone}`}</NameStyled>
            {!isFavorite && (
              <ButtonTextSmall >
                Ubah
              </ButtonTextSmall>
            )}
          </FieldContainer>
        )}
      </div>
    ));
  };

  const popupContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupContentRef.current &&
        !popupContentRef.current.contains(event.target as Node)
      ) {
        onClose(); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <>
      <PopupOverlay>
        <PopupContainer ref={popupContentRef}>
          <TitleBar>
            <BackButton onClick={onClose} />
            <span>{isEditing ? "Edit" : "Detail"} Kontak</span>
            <CloseButton onClick={onClose} />
          </TitleBar>
          {renderNameFields()}
          <div>
            <LabelStyled>Nomor HP</LabelStyled>
            {!isEditing && !isFavorite && (
              <ButtonTextSmall onClick={() => setAddingNumber(true)}>
                Tambah Nomor
              </ButtonTextSmall>
            )}
          </div>
          {renderPhoneNumbers()}
          {error && <p>Error updating contact.</p>}
         
          {isEditing ? (
            <ButtonFullwidth>
              <InnerButtonContain onClick={handleEditSave}>
                {loading ? "Loading..." : "Simpan"}
              </InnerButtonContain>
            </ButtonFullwidth>
          ):
           <AddPhoneNumber
            addingNumber={addingNumber}
            onCloseAdd={(e) => setAddingNumber(e)}
            contactId={contact.id}
            onNumberAdded={handleNumberAdded}
          />}
        </PopupContainer>
      </PopupOverlay>
    </>
  );
};

export default ContactDetailPopup;
