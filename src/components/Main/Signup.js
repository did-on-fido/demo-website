/* eslint react/jsx-no-target-blank: 0 */

import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";

import { large, medium, mediumOnly } from "../shared/grid";
import * as theme from "../shared/theme";
import { CapsuleButton } from "../shared/elements";
import webauthn from '../../webauthn/webauthn-client'

import { home } from "../../constants/config";

class Signup extends React.Component {
  state = {
    errorMessage: ''
  }
  constructor(props) {
    super(props)
    console.log('props =', props)
    this.onClickSignup = this.onClickSignup.bind(this)
    this.setErrorState = this.setErrorState.bind(this)
  }
  setErrorState () {
    this.setState({
      errorMessage: '가입에 실패하였습니다. 다시 시도해 주세요.'
    })
  }
  onClickSignup () {
    const userid = this.props.userid
    console.log('onClickSignup')
    console.log('this.props = ', this.props)

    webauthn.makeCredential(userid).then((isSuccess) => {
      if (!isSuccess) {
        this.setErrorState()
      } else {
        this.setState({
          errorMessage: '축하합니다. 가입되었습니다.'
        })
        window.location.replace('/start')
      }
    }).catch(() => {
      console.log('[error] FIDO makeCredential')
      this.setErrorState()
    })
  }
  render() {
    const { t } = this.props;
    return (<Hero>
      <Hero.Welcome>
        <a href={home.logoLink} target="_blank">
          <Logo src={home.logo} />
        </a>
        <h2>{t("Welcome to")}</h2>
        <h1>{home.name}</h1>
        <p>{t("tryDemo")}.</p>
        <p>{t("Play around")}.</p>
        <p><u>{ this.state.errorMessage }</u></p>
        <CapsuleButton onClick={this.onClickSignup}>{t("Sign Up")}</CapsuleButton>
      </Hero.Welcome>
    </Hero>
    );
  }
}

const Hero = styled.div`
  overflow: hidden;
  position: relative;
`;
Hero.Content = styled.div`
  background: ${theme.gradient1};
  padding: 60px 20px 0;
  color: #fff;
  ${medium("padding: 60px 20vw 0;")}

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 60px;
    text-align: center;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    border: none;
    border-top: solid 1px #fff;
    height: 1px;
    margin: 80px auto;
    width:  120px;
  }
`;
Hero.Steps = styled.ul`
  align-items: baseline;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${medium("display: flex;")}
`;
Hero.Step = styled.li`
  flex: 1;
  & + & {
    margin: 60px 0 0;
  }
  text-align: center;
  ${medium(`
    & + & {
      margin: 0 0 0 40px;
    }
  `)}
  h4 {
    font-weight: 600;
    margin: 30px 0 10px;
  }
`;
Hero.Step.Icon = styled.img`

`;
Hero.Welcome = styled.div`
  background: ${theme.header.bg};
  background-size: cover;
  color: ${theme.homeHeader.textColor};
  padding: 25vh 20px 40vh;
  position: relative;
  z-index: 2;
  text-align: center;
  ${large("padding: 5vh 30vw 25vh;")}
  ${mediumOnly("padding: 5vh 25vw 25vh;")}

  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 15px;
    text-transform: uppercase;
    ${medium("font-size: 1.5rem;")}
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    ${medium("font-size: 4.25rem;")}
  }
  p {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    ${medium("font-size: 1.25rem;")}
  }

  ${CapsuleButton} {
    font-size: 1rem;
    margin-top: 20px;
  }
`;
const Logo = styled.img`
  display: block;
  margin: 10px auto 70px;
  width: 32px;
`;

export default withTranslation()(Signup);

