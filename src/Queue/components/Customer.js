import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import CustomerCard from "./CustomerCard";
import ProfilePicture from "./ProfilePicture";
import { Name, Email, ExpectedTime } from "./InfoItem";
import { getEncryptedEmail } from "../Util/encryptSHA256";
import Content from "./Content";

export default ({ name, emailId, expectedDate }) => {
  const [imgHash, setImgHash] = useState("");
  useEffect(() => {
    if (emailId) {
      getEncryptedEmail(emailId).then((data) => {
        setImgHash(data);
      });
    }
  }, [emailId]);

  return (
    <CustomerCard>
      <ProfilePicture
        imgsrc={`https://www.gravatar.com/avatar/${imgHash}`}
        alt={name}
      />
      <Content>
        <Name>
          <span>Name: </span>
          {name}
        </Name>
        <Email>
          <span>Email: </span> {emailId ? emailId : "no email found"}
        </Email>
        <ExpectedTime>
          <span>Expected Time: </span>
          {expectedDate}
        </ExpectedTime>
      </Content>
    </CustomerCard>
  );
};
