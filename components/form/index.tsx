import { IContact, IPhone } from "@/helpers/contact-helper";
import {
  BackButton,
  ButtonFullwidth,
  ButtonTextSmall,
  ContactEditContainer,
  ContactIcon,
  InnerButtonContain,
  Input,
  InputGroup,
  InputPhoneGroup,
  InputPhoneWrapper,
  InputWrap,
  Label,
  PhoneNumberInput,
  PopupContainer,
  PopupOverlay,
  TitleBar,
} from "@/styles/styled";
import React, { useEffect, useRef, useState } from "react";

interface INewContactFormProps {
  onAddContact: (contact: IContact, newNumber: any) => void;
  onClose: (e?: any) => void;
}

const NewContactForm = ({ onAddContact, onClose }: INewContactFormProps) => {
  const [newContact, setNewContact] = useState<any>({
    first_name: "",
    last_name: "",
    phones: [""], 
  });

  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const updatedPhones = [...newContact.phones];
      updatedPhones[index] = value;
      setNewContact({ ...newContact, phones: updatedPhones });
    } else {
      setNewContact({ ...newContact, [name]: value });
    }
  };

  const handleAddPhone = () => {
    setNewContact({ ...newContact, phones: [...newContact.phones, ""] });
  };

  const handleRemovePhone = (index: number) => {
    const filteredPhones = newContact.phones.filter(
      (phone: IPhone, i: number) => phone && i !== index
    );
    setNewContact({ ...newContact, phones: filteredPhones });
  };

  // Check if all required fields are filled out
  const isFormValid = () => {
    return (
      newContact.first_name.trim() &&
      newContact.last_name.trim() &&
      newContact.phones.every((phone: any) => phone.trim())
    );
  };

  // Function to handle the form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddContact(newContact, setNewContact);
      onClose();
    }
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
      <form onSubmit={handleSubmit}>
        <PopupOverlay>
          <PopupContainer ref={popupContentRef}>
            <TitleBar>
              <BackButton
              onClick={onClose}
              />
              <span>Tambah Kontak</span>
            </TitleBar>
            <Label>
              <ContactEditContainer>
                <InputGroup>
                  <InputWrap>
                    <Label htmlFor="first_name">Nama depan</Label>
                    <Input
                      type="text"
                      name="first_name"
                      value={newContact.first_name}
                      onChange={(e) => handleInputChange(e, 0)}
                      required
                    />
                  </InputWrap>
                  <InputWrap>
                    <Label htmlFor="last_name">Nama Belakang</Label>
                    <Input
                      type="text"
                      name="last_name"
                      value={newContact.last_name}
                      onChange={(e) => handleInputChange(e, 0)}
                      required
                    />
                  </InputWrap>
                </InputGroup>
              </ContactEditContainer>
              <div>
                <Label htmlFor="phone_number">Nomor HP</Label>
                <ButtonTextSmall onClick={handleAddPhone}>
                  Tambah
                </ButtonTextSmall>
              </div>
              {newContact.phones.map((phone: any, index: number) => (
                <div key={index}>
                  <ContactEditContainer>
                    <InputPhoneWrapper>
                      <InputPhoneGroup>
                        <PhoneNumberInput
                          type="number"
                          name="phone"
                          value={phone}
                          placeholder="Contoh: 628121111"
                          onChange={(e) => handleInputChange(e, index)}
                          required={index === 0}
                        />
                        <ContactIcon />
                      </InputPhoneGroup>
                      {index !== 0 && (
                        <ButtonTextSmall
                          onClick={() => handleRemovePhone(index)}
                        >
                          Hapus
                        </ButtonTextSmall>
                      )}
                    </InputPhoneWrapper>
                  </ContactEditContainer>
                </div>
              ))}
            </Label>

            <ButtonFullwidth>
              <InnerButtonContain type="submit" disabled={!isFormValid()}>
                Simpan
              </InnerButtonContain>
            </ButtonFullwidth>
          </PopupContainer>
        </PopupOverlay>
      </form>
    </>
  );
};

export default NewContactForm;
