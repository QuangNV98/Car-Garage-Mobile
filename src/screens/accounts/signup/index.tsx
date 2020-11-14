import ButtonComponent from '@src/containers/components/button';
import InputComponent from '@src/containers/components/input';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {validation} from '@src/utils/index';
import React from 'react';
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {rootLoginScreen} from '../signin/navigation';
import {IProps, IState} from './propState';
import {signUpAction} from './redux/actions';
import styles from './styles';

class SignupComponent extends React.Component<IProps> {
  first_name: TextInput;
  last_name: TextInput;
  email: TextInput;
  password: TextInput;

  state: IState = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    disabledPass: true,
    isChecked: false,
    viewTAC: false,
  };

  checkTerms = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  validate = () => {
    let isValid = '';
    let controlFocus: TextInput = null;

    if (!validation.validateName(this.state.last_name)) {
      isValid = 'Please enter the last name!';
      controlFocus = this.last_name;
    }
    if (!validation.validateName(this.state.first_name)) {
      isValid = 'Please enter the first name!';
      controlFocus = this.first_name;
    }
    if (!validation.validatePassword(this.state.password)) {
      isValid = 'Your password must be at least 8 characters ';
      controlFocus = this.password;
    }
    if (!validation.validateEmail(this.state.email)) {
      isValid = 'Please enter a valid email';
      controlFocus = this.email;
    }

    if (!this.state.isChecked) {
      isValid = 'Please check to accept the Term and conditions';
      controlFocus = null;
    }
    return {isValid, controlFocus};
  };

  _signup = () => {
    const {isValid, controlFocus} = this.validate();
    if (!isValid) {
      this.props.signUpAction(this.state.first_name, this.state.last_name, this.state.email, this.state.password);
    } else {
      Alert.alert('Error', isValid, [
        {
          text: 'OK',
          onPress: () => (controlFocus ? controlFocus.focus() : null),
        },
      ]);
    }
  };

  _viewTAC = () => {
    this.setState({
      viewTAC: !this.state.viewTAC,
    });
  };

  _signin = () => rootLoginScreen();

  _onChangeText = (state: string) => (evt: any) => this.setState({[state]: evt});

  togglePassword = () => {
    this.setState({
      disabledPass: !this.state.disabledPass,
    });
  };

  render() {
    return (
      <>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={common.container}>
          <View style={{marginHorizontal: ms(28), marginTop: ms(26)}}>
            <Image style={styles.img} source={require('@src/assets/images/logo_main.png')} />
            <Text style={styles.title}>Sign Up</Text>
            <InputComponent
              ref={(input) => (this.first_name = input)}
              onChangeText={this._onChangeText('first_name')}
              value={this.state.first_name}
              placeholder="First name"
            />
            <InputComponent
              ref={(input) => (this.last_name = input)}
              onChangeText={this._onChangeText('last_name')}
              value={this.state.last_name}
              placeholder="Last name"
            />
            <InputComponent
              ref={(input) => (this.email = input)}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this._onChangeText('email')}
              value={this.state.email}
            />
            <InputComponent
              ref={(input) => (this.password = input)}
              rightIcon={this.state.disabledPass ? 'ios-eye-off' : 'ios-eye'}
              rightIconType="ionicon"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={this.state.disabledPass}
              rightIconOnPress={this.togglePassword}
              onChangeText={this._onChangeText('password')}
              value={this.state.password}
            />

            <View style={styles.wrapCheckbox}>
              <CheckBox
                title="I accept the"
                checked={this.state.isChecked}
                checkedColor={colors.silverTree}
                containerStyle={[styles.checkboxContainer, common.mr0]}
                textStyle={styles.conditionText}
                onPress={this.checkTerms}
              />
              <TouchableOpacity style={common.pd5} onPress={this._viewTAC}>
                <Text style={styles.link}>Terms and conditions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.bottomFixed}>
          <ButtonComponent
            btnFull={true}
            onPress={this._signup}
            text="Sign Up"
            disabled={this.props.isLoading}
            styleContainer={{marginHorizontal: ms(44)}}
          />
          <View style={styles.bottomRowContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity onPress={this._signin} disabled={this.props.isLoading}>
              <Text style={common.textLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={this.state.viewTAC} style={styles.modal}>
          <TouchableOpacity style={styles.btnClose} onPress={this._viewTAC}>
            <Icon type="ionicon" name="ios-close" size={ms(36)} color={colors.silverTree} />
          </TouchableOpacity>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.container}>
              <Text style={[styles.titleModal]}>Terms&Conditions</Text>
              <View>
                <Text style={styles.intro}>
                  It is very extremely important that you read these terms and conditions prior to using Pledger, as the
                  following terms govern the use of the Pledger website, and the content and services available on or
                  through the website.
                </Text>
                <Text style={styles.intro}>
                  The website is owned and operated by Pledger, and we offer its use conditional to your acceptance of
                  all of the terms and conditions herein contained. If you do not agree with any or all the conditions
                  of this agreement, please desist from using this website.
                </Text>
                <Text style={styles.intro}>
                  We may review/modify these terms and conditions at any time we deem fit without prior notice. We will
                  take your use of the Pledger website after any such change has been made as your continued agreement
                  to be subject to the terms as changed. We will indicate the last date updated at the top of this page
                  every time we revise/review our terms.
                </Text>
                <Text style={styles.intro}>
                  This agreement contains important information about your legal rights and obligations and remedies you
                  may seek. This agreement also contains important information about allowable exclusions and
                  limitations and how we handle dispute resolutions.
                </Text>
                <Text style={styles.titleContentModal}>What we do</Text>
                <Text style={styles.content}>
                  Pledger offers a platform for users to set goals and track their achievements towards those goals. We
                  allow users to use the website to enter into binding contracts in which they Pledge to meet their
                  goals (a "Pledge Contract").
                </Text>
                <Text style={styles.titleContentModal}>Eligibility</Text>
                <Text style={styles.content}>
                  To be eligible to use this website and to lawfully enter into and form contracts on this website under
                  United States law, you must:
                </Text>
                <Text style={styles.contentSub}>(a) be aged 13 or older;</Text>
                <Text style={styles.contentSub}>(b) register on the website; and</Text>
                <Text style={styles.contentSub}>(c) abide by all of the provisions of this agreement.</Text>
                <Text style={styles.titleContentModal}>User Accounts</Text>
                <Text style={styles.content}>
                  While visitors are welcome to browse through the website, you will be prompted to fill out a
                  registration if you desire to gain access to/use some portions of our website. This registration
                  process will require that you divulge private information such as your full name and applicable
                  contact details.
                </Text>
                <Text style={styles.contentSub}>You hereby represent that;</Text>
                <Text style={styles.contentSub}>(a) you are of legal age to form a binding contract;</Text>
                <Text style={styles.contentSub}>
                  (b) the information provided by you to Pledger, during registration process and in your subsequent use
                  of the service, is completely honest, accurate and straightforward;
                </Text>
                <Text style={styles.contentSub}>
                  (c) you are not a person barred from receiving comparable services to ours under United States law or
                  under the laws of another relevant jurisdiction.
                </Text>
                <Text style={styles.contentSub}>
                  We may delete your account and/or deny you any and all current or future use of the Pledger service if
                  we find out that the information you provided is dishonest, inaccurate, or intentionally deceptive.
                </Text>
                <Text style={styles.contentSub}>
                  Upon completion of the registration process, you will receive or will be prompted to choose a user
                  name and password. You accept that the responsibility for maintaining the security and confidentiality
                  of the password and account is yours.
                </Text>
                <Text style={styles.contentSub}>
                  You also agree that you will be fully liable for each activity that occurs under your account.
                </Text>
                <Text style={styles.contentSub}>
                  To maintain the sanctity of your account, you hereby agree to immediately notify Pledger of any
                  unauthorized use of your password or account or any other breach of security. You are also to ensure
                  that you properly exit from your account at the end of each session.
                </Text>
                <Text style={styles.contentSub}>
                  Pledger will in no way be answerable for any damage or loss in any way connected to your inability to
                  safeguard your account confidentiality.
                </Text>
                <Text style={styles.titleContentModal}>Our Licence to You</Text>
                <Text style={styles.content}>
                  We grant all eligible users a limited, fully reversible, non-sublicensable, non-exclusive, and
                  non-assignable license to use Pledger and its provided services in full adherence with this agreement.
                </Text>
                <Text style={styles.contentSub}>
                  You are permitted to use the website only for non-commercial and personal use and may not use the
                  services for any other reason, except we issue you a written consent to do that.
                </Text>
                <Text style={styles.contentSub}>
                  You agree, warrant and represent that no materials of any type that you submit through your account or
                  that you otherwise post, share, or transmit through the website will breach or overstep the rights of
                  any third party, including personal or proprietary, publicity, privacy, copyright, trademark or other
                  rights.
                </Text>
                <Text style={styles.titleContentModal}>Duration of this Agreement</Text>
                <Text style={styles.content}>
                  These terms and conditions will remain fully in force and be effective while you use the website as a
                  registered user. You, however, understand that we have the right to delete your profile, terminate
                  your membership, and to delete any information or content posted by you on the website for any reason
                  whatsoever.
                </Text>
                <Text style={styles.contentSub}>
                  We may also bar you from using or accessing any feature, aspect or portion of the website for no or
                  any reason, and we may do this with or without notice, based only on our sole discretion.
                </Text>
                <Text style={styles.contentSub}>
                  As a user, you have the choice of terminating your membership at any time that you so choose for any
                  reason whatsoever. You, however, understand that if you have an on-going Pledge Contract at the time
                  of your termination, you will continue to be constrained by the terms of that Pledge Contract until
                  that Pledge Contract ends.
                </Text>
                <Text style={styles.contentSub}>
                  You, however, understand that some provisions of this agreement will remain in effect even after your
                  membership is terminated.
                </Text>
                <Text style={styles.titleContentModal}>Intellectual Property and Proprietary Rights</Text>
                <Text style={styles.content}>
                  All the materials showed and contained in the website, which may without limitation include all
                  reports, delineations, pictures, representation, photos, materials, articles, information, or other
                  data as well as all and any software programs provided via the website, are trademarked and
                  copyrighted. With no exception, they are all protected by intellectual property laws, except we have
                  explicitly indicated so to the contrary.
                </Text>
                <Text style={styles.contentSub}>
                  All interests, titles, and rights relating to the content are owned, controlled by, or licensed to
                  Pledger. You hereby accept that the website and its contents are designed and presented by us in a
                  unique format and appearance, and users are allowed to view the website and its contents and print or
                  download one copy of the website, or specific parts of the website, for personal use only.
                </Text>
                <Text style={styles.contentSub}>
                  Pledger, www.pledgerapp.io, its logo, service marks, trademarks, and graphics used as it relates to
                  this website are registered trademarks of Pledger. Other logos, service marks, trademarks, and
                  graphics used in and on this website may be the trademarks of other third parties.
                </Text>
                <Text style={styles.contentSub}>
                  Your use of the Pledger website does not grant you the right or license to replicate or otherwise use
                  any Pledger or third-party trademarks.
                </Text>
                <Text style={styles.titleContentModal}>Copyright Protection Clause</Text>
                <Text style={styles.content}>
                  Without obtaining the written consent of a copyright owner, it is important that you do not, in any
                  way, upload, reproduce or distribute any service marks, trademarks, or copyrighted material or other
                  proprietary information that another party owns.
                </Text>
                <Text style={styles.contentSub}>
                  Where you believe that your work was copied and posted on the website without your permission or in
                  any other way that might be deemed copyright infringement, make sure to review the procedures that we
                  have explained under our copyright policy.
                </Text>
                <Text style={styles.contentSub}>
                  In our bid to adhere to the Digital Millennium Copyright Act (DMCA) and other relevant law, it is our
                  policy to terminate the accounts of members who are considered as repeat infringers.
                </Text>
                <Text style={styles.contentSub}>
                  At our discretion, we may also restrict access to the website and/or stop the access of users who
                  violate the memberships of other users, even where there has been no repeat infringement or
                  infringement of the company's intellectual property rights.
                </Text>
                <Text style={styles.contentSub}>
                  As per the Digital Millennium Copyright Act of 1998 (“DMCA”), if you are a copyright owner, the legal
                  representative of a copyright owner, or a representative permitted to act in respect to applicable
                  copyright, we ask that you report any alleged copyright infringements found on the website to us. Your
                  notice must contain:
                </Text>
                <Text style={styles.contentSub}>An identification of the alleged copyrighted work;</Text>
                <Text style={styles.contentSub}>
                  An identification of the allegedly infringing material alongside enough information to permit us to
                  locate the material;
                </Text>
                <Text style={styles.contentSub}>Your mailing address, telephone number, and email address;</Text>
                <Text style={styles.contentSub}>
                  A good faith belief statement that the disputed use of the copyrighted material was not authorized by
                  copyright owner, its agent or the law;
                </Text>
                <Text style={styles.contentSub}>
                  A good faith statement that you are the owner, or that you are authorized to act on behalf of the
                  owner, of the copyright that is allegedly infringed; and
                </Text>
                <Text style={styles.contentSub}>Your legal name and electronic or physical signature.</Text>
                <Text style={styles.titleContentModal}>User Content and Conduct</Text>
                <Text style={styles.content}>
                  Registered users are allowed to publicly post or privately transmit content (which may include data,
                  text, photographs, information, graphics, or other materials) on the website. It is important to
                  understand that all contents are the personal responsibility of the individual from which they came
                  from.
                </Text>
                <Text style={styles.contentSub}>
                  This means that each user and not Pledger will bear responsibility for all the content that they post,
                  transmit, email, upload, or otherwise provide through the website. We do not vouch for their
                  truthfulness, quality, and accurateness, and we are not in any way endorsing any opinion/content
                  posted by any user.
                </Text>
                <Text style={styles.contentSub}>
                  We may monitor user-provided content for unauthorized and/or illegal activity, but we are not
                  obligated to do so.
                </Text>
                <Text style={styles.contentSub}>
                  Using this website means that you may find unpleasant, indecent, or otherwise objectionable materials.
                  In no event will Pledger be liable for any omissions or mistakes in any content, any damage or loss of
                  any type so experienced because of a user’s utilization of any content transmitted, posted, emailed,
                  or otherwise provided through the website.
                </Text>
                <Text style={[styles.content, {marginTop: ms(25)}]}>
                  You may not upload content that is illegal, slanderous, vile, humiliating or unmannerly to any other
                  entity or individual as decided by Pledger, and you may not submit/upload false content or the one
                  that breaches the rights of others, including patents, trade secrets trademarks, copyrights, and
                  publicity or privacy rights.
                </Text>
                <Text style={styles.contentSub}>
                  Your content must not harm or seek to in any way harm minors, and may not imply that you a Pledger
                  official, or misleadingly state or otherwise falsify your association with a person or entity.
                </Text>
                <Text style={styles.contentSub}>
                  When you upload any content to the website, you automatically grant or warrant that the owner of such
                  content has clearly granted us a universal, nonexclusive, unlimited, irreversible, continuous,
                  royalty-free, license to create derivative works from, adapt, display, perform, distribute, convert,
                  edit, issue, replicate, and use the material in any way, through any media, and in any manner.
                </Text>
                <Text style={styles.contentSub}>
                  It is very important that you understand that it is better to never submit any user content that you
                  are not willing to license to us, as you understand that we are under no obligation to maintain the
                  confidentiality of any content, to respond to any user content, or to pay compensation for the use of
                  any content.
                </Text>
                <Text style={styles.contentSub}>
                  We bar users from forging headers and from manipulating identifiers in a bid to hide the source of any
                  material communicated through the service; and from uploading, posting, emailing, transmitting or
                  otherwise making available any content that they have no right to so provide under fiduciary or
                  pledged relationships or any other law.
                </Text>
                <Text style={styles.contentSub}>
                  You are not to provide advertisements, solicitations or spam links to other web sites or individuals,
                  without prior written permission from Pledger; chain letters or pyramid schemes; or content that
                  imitates another business, entity or person, including Pledger, its related entities, employees and
                  agents.
                </Text>
                <Text style={styles.contentSub}>
                  As a user, your uploaded content may not interrupt the standard flow of dialogue; act in a way that
                  hinders other users’ ability to carry out real-time exchanges; or interferes with or disrupts the
                  Service or networks or servers associated with the Service.
                </Text>
                <Text style={styles.contentSub}>
                  You are barred from posting content containing viruses or other damaging computer codes, or content
                  that oppresses degrades, hassles, or threatens a person/group of persons based on ethnicity, race,
                  disability, age, gender, sexual orientation, or religion.
                </Text>
                <Text style={styles.contentSub}>
                  You may not collect other users’ information or content, or otherwise, access Pledger using harvesting
                  bots or any other automated means without our prior permission.
                </Text>
                <Text style={styles.contentSub}>
                  You are fully and personally responsible for any content submitted by you and are agreeing to
                  indemnify Pledger and its affiliates for all and any claims ensuing from any content that you make
                  available.
                </Text>
                <Text style={styles.contentSub}>
                  We reserve the right but are not obligated by law to continually monitor and assess the website's
                  overall content to determine agreement with these terms and conditions. We may, in our sole
                  discretion, exercise our right to move, revise, or remove any content posted on Pledger for any
                  reason, including violation of these terms, whether for legal or other reasons.
                </Text>
                <Text style={styles.contentSub}>
                  You hereby agree that you will always evaluate, and consequently take on all the associated risks as
                  per the use of any website-provided content, including any dependence on the usefulness, accuracy, or
                  completeness of such content.
                </Text>
                <Text style={styles.titleContentModal}>Disclaimers and Limitation of Liability</Text>
                <Text style={styles.content}>
                  The website, the website content, and our services are made available "as-is" and Pledger disclaims
                  all warranties and representations, whether this is express or implied. This includes without
                  limitation the warranties of non-infringement, fitness for a particular purpose, suitability,
                  merchantability, or title.
                </Text>
                <Text style={styles.contentSub}>
                  All downloads and obtainment of software, data, material, or content from or through the website are
                  done at your own risk and discretion, and we will not be liable to you for any damage, if any, to your
                  computer system or mobile device, or for the loss of data, or any other experienced harm of any kind.
                </Text>
                <Text style={styles.contentSub}>
                  We will not be liable to you for the content found on the website, whether this content is posted by
                  us, by third parties, by other Pledger users, or by programming or equipment related to the website.
                </Text>
                <Text style={styles.contentSub}>
                  You accept that this website may, from time to time, be unavailable temporarily for reasons including
                  but not limited to maintenance. We will not bear any responsibility to you for any delay, defect,
                  deletion, interruption, omission, or error that you may encounter in operation or transmission,
                  communications line failure, theft or destruction or unauthorized access to, or alteration of, user
                  communications including but not limited to user content.
                </Text>
                <Text style={styles.contentSub}>
                  Under no circumstances will Pledger be liable for any damage or loss, including any damage or loss to
                  any user content or personal injury or death that may occur as a result of your use of the services.
                </Text>
                <Text style={styles.contentSub}>
                  Pledger does not warrant or represent that the materials, content, or software found on the website
                  and through the service are error-free, current, accurate, reliable, or complete, neither do we
                  warrant that the website is free of viruses or other injurious components. You must, therefore,
                  exercise caution when using or downloading any such materials, content, or software.
                </Text>
                <Text style={styles.contentSub}>
                  Pledger is not a medical or psychological organization, and you may not take anything on this website
                  and from this service as medical or psychological diagnosis or advice. You accept that we have no
                  knowledge of your health condition(s) and that you bear the sole responsibility and will be liable for
                  any actions that you take that may constitute a health or psychological risk to yourself.
                </Text>
                <Text style={styles.contentSub}>
                  Pledger cannot guarantee, nor does it, give any assurance or warranties as to the specific results
                  obtained from the website's use.
                </Text>
                <Text style={styles.contentSub}>
                  Under no circumstances will Pledger or its owners, managers, staff or agents be held accountable for
                  any indirect, punitive, special, incidental, exemplary, or consequential loss or damages, including
                  without limitation all lost goodwill, data, profit, opportunity, revenue and time that may occur from
                  your use of the website, even if Pledger has been made aware of the likelihood of such damages.
                </Text>
                <Text style={styles.contentSub}>
                  We will not be held accountable for any situation whose occurrence was beyond our control that may
                  cause the Pledger services to be late, interrupted, or corrupt; any hurts, losses, or damages of any
                  type arising as it relates to, or as a consequence of, using Pledger.
                </Text>
                <Text style={styles.contentSub}>
                  We will not bear responsibility to you or other individuals, for any events outside our control; or
                  for any unpredictable harms or misfortunes.
                </Text>
                <Text style={styles.contentSub}>
                  No provision of this legal document is planned to exclude or restrict our culpability for injury or
                  for death arising from our carelessness and deception, as well as for other liabilities that are not
                  to be restricted or exempted by law, or that are aimed at restricting your constitutional rights as a
                  consumer.
                </Text>
                <Text style={styles.contentSub}>
                  Should the applicable law of your jurisdiction not permit the restriction of liability herein
                  explained, this limitation of liability will not apply to you.
                </Text>
                <Text style={styles.titleContentModal}>Links to other Resources</Text>
                <Text style={styles.content}>
                  We are not liable for the content of any off-site resources or any other websites linked to or from
                  the website. Links found on the website have been put there for the convenience of users and are not a
                  commendation or recommendation by us, our associates, or our partners of the supplier, service,
                  product, or content of such a link.
                </Text>
                <Text style={styles.contentSub}>
                  When you link to or from any websites that are not ours, you do so at your own risk. We do not have
                  the responsibility of, and will not be liable to you for evaluating or examining the offerings,
                  content, product, service, or policies of such off-website pages.
                </Text>
                <Text style={styles.contentSub}>
                  We do not assume any liability or responsibility for the offerings, content, product, service, or
                  policies of these pages and advise that you very carefully read and review their terms of use as well
                  as their policy statements and all other referenced policies before you use them.
                </Text>
                <Text style={styles.titleContentModal}>Disputes between users</Text>
                <Text style={styles.content}>
                  You are fully responsible and answerable for your interactions with other Pledger users. Despite the
                  foregoing, we have the right but are not obligated, to monitor disputes between you and other users.
                </Text>
                <Text style={styles.titleContentModal}>Alternative Dispute Resolution</Text>
                <Text style={styles.content}>
                  You and Pledger agree that all disputes that may arise, however arising, between both of us or in
                  relation to this agreement shall be submitted first to non-binding mediation. Where the dispute is not
                  resolvable through such mediation, the dispute shall be resolved through binding arbitration in
                  Florida in accordance with the Consumer Procedures and Rules of the American Arbitration Association.
                </Text>
                <Text style={styles.contentSub}>
                  There shall be no form of class action in any way, and you are accepting that all disputes shall be
                  arbitrated on an individual basis. Disputes brought to arbitration may not be joined or consolidated
                  in arbitration with disputes brought by or against any third party, unless agreed to in writing by all
                  parties.
                </Text>
                <Text style={styles.titleContentModal}>Indemnity</Text>
                <Text style={styles.content}>
                  You agree to shield, indemnify, and consider Pledger (its subsidiaries, affiliates, officers, agents,
                  co-branders or other partners, and employees) innocent against any and all claims, expenses, and fees
                  (including but not limited to legal fees), and damages in connection with the Pledger website usage.
                  You also agree to so shield, indemnify, and hold Pledger innocent for all damages resulting from your
                  violation (if any) of this agreement.
                </Text>
                <Text style={styles.titleContentModal}>Third-Party Beneficiaries</Text>
                <Text style={styles.content}>
                  You understand and accept that this agreement does not take any third party beneficiaries into
                  consideration.
                </Text>
                <Text style={styles.titleContentModal}>No agency</Text>
                <Text style={styles.content}>
                  This agreement does not create or form any franchisor-franchisee, employer, partnership, agency, or
                  joint venture between you and us in any way.
                </Text>
                <Text style={styles.titleContentModal}>Waiter/Severability of Terms</Text>
                <Text style={styles.content}>
                  The failure of Pledger to implement or exercise any condition or right of these terms shall not be
                  deemed or labeled a waiver of such a condition or right. If any term of the agreement is declared by a
                  court of competent jurisdiction in the United States to be illegal or unenforceable, we will modify
                  that specific provision in an attempt to reflect the original intention. In this case, the residue of
                  the conditions of the agreement will remain binding upon both parties.
                </Text>
                <Text style={styles.titleContentModal}>No right of survivorship and non-transferability</Text>
                <Text style={styles.content}>
                  You agree that your Pledger account is non-transferable and that any rights to your Pledger account or
                  contents shall be terminated upon your death.
                </Text>
                <Text style={styles.titleContentModal}>Jurisdictional Law</Text>
                <Text style={styles.content}>
                  This legal agreement is governed by laws of the United States, and you consent to submit to the
                  jurisdiction of its courts.
                </Text>
                <Text style={styles.titleContentModal}>Survival</Text>
                <Text style={styles.content}>
                  All terms and provisions of this agreement, which by their very nature are billed to survive any
                  termination of this agreement shall so survive any such termination.
                </Text>
                <Text style={styles.contentSub}>
                  You accept that we will continue to be bound by such terms indefinitely.
                </Text>
                <Text style={styles.titleContentModal}>Entire Agreement and Relationship with any Pledge Contract</Text>
                <Text style={styles.contentFooter}>
                  While these terms and conditions represent the entire agreement between you and Pledger regarding the
                  use of the website, and even though it supersedes any prior agreements you may have, you accept that
                  it does not supersede any Pledge Contracts between you and Pledger.
                </Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({isLoading: state.common.isLoading});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({signUpAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
