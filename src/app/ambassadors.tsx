import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import FormField from '../components/FormField';
import Honeypot from '../components/Honeypot';
import { useFormSubmit } from '../lib/useFormSubmit';
import { isEmail, isPhone, required, type Errors } from '../lib/validation';
import { fonts } from '../theme/typography';
import { Award, Crown, Users, Check, Send, CheckCircle2, ShieldCheck } from '../components/icons';


const PROVINCES = [
  'Central Province (Kandy, Matale, Nuwara Eliya)',
  'Western Province (Colombo, Gampaha, Kalutara)',
  'Southern Province (Galle, Matara, Hambantota)',
  'Northern Province (Jaffna, Kilinochchi, Mannar)',
  'Eastern Province (Trincomalee, Batticaloa, Ampara)',
  'North Western Province (Kurunegala, Puttalam)',
  'North Central Province (Anuradhapura, Polonnaruwa)',
  'Uva Province (Badulla, Monaragala)',
  'Sabaragamuwa Province (Ratnapura, Kegalle)',
];

export default function AmbassadorsPage() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCES[0]);
  const [academicYear, setAcademicYear] = useState('');
  const [motivation, setMotivation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const institutionRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const motivationRef = useRef<TextInput>(null);

  type Field = 'fullName' | 'email' | 'phone' | 'institution' | 'motivation' | 'agreed';

  const validate = useCallback((): Errors<Field> => {
    const e: Errors<Field> = {};
    if (!required(fullName)) e.fullName = 'We need your name.';
    if (!required(email)) e.email = 'An email is required: this is how we confirm your place.';
    else if (!isEmail(email)) e.email = 'That email address does not look right.';
    if (!isPhone(phone)) e.phone = 'Use a Sri Lankan number, e.g. 071 234 5678.';
    if (!required(institution)) e.institution = 'Tell us which school or university you represent.';
    if (!required(motivation)) e.motivation = 'A short statement helps us pick ambassadors.';
    if (!isChecked) e.agreed = 'Please accept the ambassador commitment to continue.';
    return e;
  }, [fullName, email, phone, institution, motivation, isChecked]);

  const build = useCallback(
    () => ({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      institution: institution.trim(),
      province: selectedProvince,
      academicYear: academicYear.trim() || null,
      motivation: motivation.trim(),
      agreedToCommitment: isChecked,
    }),
    [fullName, email, phone, institution, selectedProvince, academicYear, motivation, isChecked]
  );

  const { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap } =
    useFormSubmit<Field>({ kind: 'ambassadors', validate, build });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Campus Ambassadors | NASA Space Apps Sri Lanka"
        description="Lead NASA Space Apps on your campus. Apply to become an official Space Apps Sri Lanka ambassador."
        path="/ambassadors"
      />
      <Navbar />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.badge}>
          <Crown size={14} color={colors.primary} />
          <Text style={styles.badgeText}>CAMPUS LEADERSHIP PROGRAM</Text>
        </View>

        <Text style={styles.headerTitle}>
          LEAD THE SPACE{'\n'}
          <Text style={styles.headerTitleCyan}>REVOLUTION</Text> ON YOUR CAMPUS
        </Text>
        <Text style={styles.headerSubtitle}>
          Become an official NASA Space Apps Ambassador and inspire the next generation of space innovators across schools and universities in Sri Lanka.
        </Text>
      </View>

      {/* Main Layout (Two Column) */}
      <View style={styles.mainLayout}>
        {/* Left Column: Benefits Cards */}
        <View style={styles.benefitsCol}>
          <Text style={styles.columnHeaderTitle}>AMBASSADOR PRIVILEGES</Text>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Award color={colors.primary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Official NASA Space Apps Certificate</Text>
              <Text style={styles.benefitDesc}>
                Recognized globally as an official NASA Space Apps ambassador with credentials verified by NASA headquarters, boosting your academic and career profile.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={[styles.iconBox, { borderColor: 'rgba(255, 107, 53, 0.3)' }]}>
              <Crown color={colors.secondary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>VIP Event & Hackathon Access</Text>
              <Text style={styles.benefitDesc}>
                Priority access to all NASA Space Apps events, exclusive pre-hackathon webinars, mentor masterclasses, and behind-the-scenes organizing privileges.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Users color={colors.primary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>National Innovation Network</Text>
              <Text style={styles.benefitDesc}>
                Join a curated council of 50+ student leaders across all 9 provinces, interacting directly with research scientists, university deans, and tech executives.
              </Text>
            </View>
          </View>

          {/* Verification Badge Box */}
          <View style={styles.verifiedBox}>
            <ShieldCheck size={20} color="#10B981" />
            <Text style={styles.verifiedText}>
              Applications reviewed by NASA Space Apps Kandy Organizing Committee within 48 hours.
            </Text>
          </View>
        </View>

        {/* Right Column: Application Form */}
        <View style={styles.formCol}>
          <View style={styles.formCard}>
            {submitted ? (
              <View style={styles.successContainer}>
                <CheckCircle2 size={56} color="#10B981" style={{ marginBottom: 16 }} />
                <Text style={styles.successTitle}>APPLICATION SUBMITTED!</Text>
                <Text style={styles.successDesc}>
                  Thank you, <Text style={{ color: colors.text, fontWeight: '700' }}>{fullName}</Text>. We have received your ambassador application for <Text style={{ color: colors.primary }}>{institution}</Text>.
                </Text>
                <Text style={styles.successSub}>
                  Our outreach team will reach out via email with your onboarding toolkit.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  style={styles.resetBtn}
                  onPress={() => {
                    reset();
                    setFullName('');
                    setInstitution('');
                    setMotivation('');
                    setIsChecked(false);
                  }}
                >
                  <Text style={styles.resetBtnText}>SUBMIT ANOTHER APPLICATION</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.formTitle}>
                  AMBASSADOR <Text style={{ color: colors.primary }}>APPLICATION</Text>
                </Text>
                <Text style={styles.formSubtitle}>
                  Fill out the form below to lead the initiative at your campus.
                </Text>

                {/* Full Name */}
                <FormField
                  label="FULL NAME"
                  required
                  placeholder="e.g. Kasun Perera"
                  value={fullName}
                  error={errors.fullName}
                  onChangeText={(v) => {
                    setFullName(v);
                    clearError('fullName');
                  }}
                  autoComplete="name"
                  textContentType="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />

                {/* Email */}
                <FormField
                  ref={emailRef}
                  label="EMAIL ADDRESS"
                  required
                  placeholder="kasun@example.com"
                  value={email}
                  error={errors.email}
                  onChangeText={(v) => {
                    setEmail(v);
                    clearError('email');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />

                {/* Phone */}
                <FormField
                  ref={phoneRef}
                  label="CONTACT PHONE NUMBER"
                  placeholder="071 234 5678"
                  value={phone}
                  error={errors.phone}
                  onChangeText={(v) => {
                    setPhone(v);
                    clearError('phone');
                  }}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  returnKeyType="next"
                  onSubmitEditing={() => institutionRef.current?.focus()}
                />

                {/* School / University */}
                <FormField
                  ref={institutionRef}
                  label="SCHOOL OR UNIVERSITY"
                  required
                  placeholder="e.g. University of Peradeniya / Trinity College"
                  value={institution}
                  error={errors.institution}
                  onChangeText={(v) => {
                    setInstitution(v);
                    clearError('institution');
                  }}
                  autoComplete="organization"
                  returnKeyType="next"
                  onSubmitEditing={() => yearRef.current?.focus()}
                />

                {/* District / Province */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>DISTRICT / PROVINCE</Text>
                  <View style={styles.provincePicker}>
                    {PROVINCES.slice(0, 4).map((p, idx) => {
                      const isSel = selectedProvince === p;
                      return (
                        <Pressable
                          accessibilityRole="button"
                          key={idx}
                          style={[styles.provinceChip, isSel && styles.provinceChipActive]}
                          onPress={() => setSelectedProvince(p)}
                        >
                          <Text style={[styles.provinceChipText, isSel && styles.provinceChipTextActive]}>
                            {p.split(' ')[0]}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Academic Year */}
                <FormField
                  ref={yearRef}
                  label="YEAR / GRADE"
                  placeholder="e.g. 2nd Year Undergraduate / Grade 12"
                  value={academicYear}
                  onChangeText={setAcademicYear}
                  returnKeyType="next"
                  onSubmitEditing={() => motivationRef.current?.focus()}
                />

                {/* Statement */}
                <FormField
                  ref={motivationRef}
                  label="WHY DO YOU WANT TO BE AN AMBASSADOR?"
                  required
                  placeholder="Tell us briefly about your passion for space technology and campus outreach..."
                  value={motivation}
                  error={errors.motivation}
                  onChangeText={(v) => {
                    setMotivation(v);
                    clearError('motivation');
                  }}
                  multiline
                  numberOfLines={3}
                  maxLength={1000}
                />

                <Honeypot value={trap} onChangeText={setTrap} />

                {/* Agreement Checkbox */}
                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => {
                    setIsChecked(!isChecked);
                    clearError('agreed');
                  }}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isChecked }}
                  accessibilityLabel="I agree to advocate for NASA Space Apps and commit to student outreach"
                >
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Check size={14} color="#050912" />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I agree to advocate for NASA Space Apps and commit to student outreach.
                  </Text>
                </Pressable>
                {errors.agreed ? (
                  <Text style={styles.formError} accessibilityRole="alert">
                    {errors.agreed}
                  </Text>
                ) : null}

                {formError ? (
                  <Text style={styles.formError} accessibilityRole="alert">
                    {formError}
                  </Text>
                ) : null}

                {/* Submit CTA */}
                <Pressable
                  style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
                  onPress={submit}
                  disabled={submitting}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: submitting, busy: submitting }}
                >
                  <Text style={styles.submitBtnText}>
                    {submitting ? 'SENDING\u2026' : 'SUBMIT APPLICATION'}
                  </Text>
                  {submitting ? (
                    <ActivityIndicator size="small" color="#050912" style={{ marginLeft: 8 }} />
                  ) : (
                    <Send size={16} color="#050912" style={{ marginLeft: 8 }} />
                  )}
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? 'transparent' : colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerSection: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 900,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: width > 768 ? 44 : width > 480 ? 32 : 27,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: width > 768 ? 52 : width > 480 ? 38 : 33,
    marginBottom: 16,
  },
  headerTitleCyan: {
    color: colors.primary,
    textShadow: '0px 0px 16px rgba(0, 229, 255, 0.4)',
  },
  headerSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 680,
  },
  mainLayout: {
    flexDirection: width > 900 ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    paddingVertical: 40,
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
    gap: 40,
  },
  benefitsCol: {
    flex: width > 900 ? 1.2 : undefined,
  },
  columnHeaderTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
    marginBottom: 20,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    gap: 18,
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 6,
  },
  benefitDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 21,
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  verifiedText: {
    fontFamily: fonts.body,
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  formCol: {
    flex: width > 900 ? 1 : undefined,
  },
  formCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    borderRadius: 24,
    padding: 28,
    boxShadow: '0px 16px 30px rgba(0, 0, 0, 0.5)',
  },
  formTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  formSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 8,
  },
  textInput: {
    fontFamily: fonts.body,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  provincePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  provinceChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  provinceChipActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderColor: colors.primary,
  },
  provinceChipText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  provinceChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontFamily: fonts.body,
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    boxShadow: '0px 0px 16px rgba(0, 229, 255, 0.5)',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  formError: {
    color: colors.secondary,
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    marginBottom: 12,
  },
  submitBtnText: {
    color: '#050912',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 0.8,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  successTitle: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  successDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  successSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 24,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
