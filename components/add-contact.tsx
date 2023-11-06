import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUERY } from "@/lib/queries";
import {
  ButtonFullwidth,
  ButtonTextSmall,
  ContactEditContainer,
  ContactIcon,
  InnerButtonContain,
  InputPhoneGroup,
  InputPhoneWrapper,
  LabelStyled,
  PhoneNumberInput,
} from "@/styles/styled";

interface IAddphoneNumberProps {
  contactId: number;
  addingNumber: boolean;
  onNumberAdded: () => void;
  onCloseAdd: (e: any) => void;
}

const AddPhoneNumber = ({
  addingNumber,
  contactId,
  onNumberAdded,
  onCloseAdd,
}: IAddphoneNumberProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [addNumberToContact, { loading, error }] = useMutation(
    ADD_QUERY.NUMBER_TO_CONTACT,
    {
      onCompleted: (data) => {
        onNumberAdded();
        onCloseAdd(false);
        setPhoneNumber("");
      },
      onError: (error) => {
        console.error("Error adding phone number", error);
      },
    }
  );

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!phoneNumber) return;

    addNumberToContact({
      variables: {
        contact_id: contactId,
        phone_number: phoneNumber,
      },
    });
  };

  if (loading) return <p>Adding number...</p>;
  if (error) return <p>An error occurred while adding the number.</p>;

  return (
    <div>
      {addingNumber && (
        <form onSubmit={handleSubmit}>
          <ContactEditContainer>
            <LabelStyled>Tambah Nomor HP</LabelStyled>
            <InputPhoneWrapper>
              <InputPhoneGroup>
                <PhoneNumberInput
                  type="number"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
                <ContactIcon />
              </InputPhoneGroup>
              <ButtonTextSmall onClick={() => onCloseAdd(false)}>
                Cancel
              </ButtonTextSmall>
            </InputPhoneWrapper>
          </ContactEditContainer>
          <ButtonFullwidth>
            <InnerButtonContain
              type="submit"
              disabled={phoneNumber.length == 0}
            >
              {loading ? "Loading..." : "Tambah"}
            </InnerButtonContain>
          </ButtonFullwidth>
        </form>
      )}
    </div>
  );
};

export default AddPhoneNumber;
