import { Pressable } from '../components/LocalizedPressable';
import { submissionsReady } from '../lib/firebase';
import { Link } from 'expo-router';
import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Text } from '../components/LocalizedText';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import FormField from '../components/FormField';
import Honeypot from '../components/Honeypot';
import { useFormSubmit } from '../lib/useFormSubmit';
import { isEmail, isPhone, required, tooLong, type Errors } from '../lib/validation';
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
  const { width } = useViewport();
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

  type Field = 'fullName' | 'email' | 'phone' | 'institution' | 'motivation' | 'agreed' | 'academicYear';

  const validate = useCallback((): Errors<Field> => {
    const e: Errors<Field> = {};
    if (!required(fullName)) e.fullName = 'We need your name.';
    if (!required(email)) e.email = 'An email is required so organisers can contact you.';
    else if (!isEmail(email)) e.email = 'That email address does not look right.';
    if (!isPhone(phone)) e.phone = 'Use a Sri Lankan number, e.g. 071 234 5678.';
    if (!required(institution)) e.institution = 'Tell us which school or university you represent.';
    if (!required(motivation)) e.motivation = 'A short statement helps us pick ambassadors.';
    if (tooLong(fullName,120)) e.fullName = 'Please keep this under 120 characters.';
    if (tooLong(institution,200)) e.institution = 'Please keep this under 200 characters.';
    if (tooLong(motivation,1000)) e.motivation = 'Please keep this under 1000 characters.';
    if (tooLong(academicYear,80)) e.academicYear = 'Please keep this under 80 characters.';
    if (!isChecked) e.agreed = 'Please read and acknowledge the local notice to continue.';
    return e;
  }, [fullName, email, phone, institution, motivation, isChecked, academicYear]);

  const build = useCallback(
    () => ({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      institution: institution.trim(),
      province: selectedProvince,
      academicYear: academicYear.trim() || null,
      motivation: motivation.trim(),
      agreedToLocalNotice: isChecked,
    }),
    [fullName, email, phone, institution, selectedProvince, academicYear, motivation, isChecked]
  );

  const { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap, attemptLocked } =
    useFormSubmit<Field>({ kind: 'ambassadors', validate, build });

  return (
    <PageShell
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Campus Ambassadors | NASA Space Apps Sri Lanka"
        description="Lead NASA Space Apps on your campus. Express interest in supporting local campus outreach."
        path="/ambassadors"
      />
      <Navbar />

      {/* Header Section */}
      <PageHeader number="04" eyebrow="CAMPUS AMBASSADORS" title={"Spark curiosity\non your campus."} description="Bring your school or university into the Space Apps community. Connect curious people and help great ideas find their start." />

      {/* Main Layout (Two Column) */}
      <View style={styles.mainLayout}>
        {/* Left Column: Benefits Cards */}
        <View style={styles.benefitsCol}>
          <Text style={styles.columnHeaderTitle}>CAMPUS OUTREACH</Text>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Award color={colors.primary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Connect your campus</Text>
              <Text style={styles.benefitDesc}>
                Help students discover the Space Apps community and find official participation information. This is a local outreach interest form, not a NASA credential.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={[styles.iconBox, { borderColor: 'rgba(46, 150, 245, 0.3)' }]}>
              <Crown color={colors.secondary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Share learning opportunities</Text>
              <Text style={styles.benefitDesc}>
                Share verified event updates and public learning resources with your school or university. Local arrangements will be confirmed by organisers.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Users color={colors.primary} size={24} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Connect with students</Text>
              <Text style={styles.benefitDesc}>
                Connect with other students who are interested in science, teamwork and open data. No special access or awards are guaranteed.
              </Text>
            </View>
          </View>

          {/* Verification Badge Box */}
          <View style={styles.verifiedBox}>
            <ShieldCheck size={20} color="#10B981" />
            <Text style={styles.verifiedText}>
              Local applications are expressions of interest. Review timing and any offered role will be confirmed by organisers.
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
                  Your local application has been received.
                </Text>
                <Text style={styles.successSub}>
                  Your response is saved for local review. No appointment or email delivery is implied by this receipt.
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
                    setEmail(''); setPhone(''); setAcademicYear(''); setSelectedProvince(PROVINCES[0]);
                  }}
                >
                  <Text style={styles.resetBtnText}>SUBMIT ANOTHER APPLICATION</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.formTitle}>
                  AMBASSADOR APPLICATION
                </Text>
                <Text style={styles.formSubtitle}>
                  Fill out the form below to lead the initiative at your campus.
                </Text>

                {/* Full Name */}
                {!submissionsReady() && <Text style={styles.formSubtitle}>Local form submissions are currently paused. Please do not enter sensitive personal information.</Text>}
                <FormField editable={!attemptLocked}
                  maxLength={120}
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
                <FormField editable={!attemptLocked}
                  maxLength={200}
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
                <FormField editable={!attemptLocked}
                  maxLength={30}
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
                <FormField editable={!attemptLocked}
                  maxLength={200}
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
                  <Text style={styles.inputLabel}>PROVINCE</Text>
                  <View style={styles.provincePicker}>
                    {PROVINCES.map((p, idx) => {
                      const isSel = selectedProvince === p;
                      return (
                        <Pressable disabled={attemptLocked} aria-disabled={attemptLocked}
                          accessibilityRole="button"
                          key={idx}
                          style={[styles.provinceChip, isSel && styles.provinceChipActive]}
                          accessibilityState={{ selected: isSel }}
                          aria-pressed={isSel}
                          onPress={() => setSelectedProvince(p)}
                        >
                          <Text style={[styles.provinceChipText, isSel && styles.provinceChipTextActive]}>
                            {p}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Academic Year */}
                <FormField editable={!attemptLocked}
                  maxLength={80}
                  ref={yearRef}
                  label="YEAR / GRADE"
                  placeholder="e.g. 2nd Year Undergraduate / Grade 12"
                  value={academicYear}
                  error={errors.academicYear}
                  onChangeText={setAcademicYear}
                  returnKeyType="next"
                  onSubmitEditing={() => motivationRef.current?.focus()}
                />

                {/* Statement */}
                <FormField editable={!attemptLocked}
                  maxLength={1000}
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

                />


              <Link href="/privacy" accessibilityRole="link"><Text style={{ color: colors.primary, marginBottom: 12 }}>Privacy notice</Text></Link>
              <Link href="/participation" accessibilityRole="link"><Text style={{ color: colors.primary, marginBottom: 20 }}>Local participation information</Text></Link>
              {attemptLocked && <Text accessibilityLiveRegion="polite" aria-live="polite" style={styles.formSubtitle}>This attempt is locked while receipt is uncertain. Retry sends the same details. Do not reload or start another application.</Text>}
              <Honeypot value={trap} onChangeText={setTrap} />

                {/* Agreement Checkbox */}
                <Pressable disabled={attemptLocked} aria-disabled={attemptLocked}
                  style={styles.checkboxRow}
                  onPress={() => {
                    setIsChecked(!isChecked);
                    clearError('agreed');
                  }}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isChecked }}
                  aria-checked={isChecked}
                  accessibilityLabel="I have read the local participation information and privacy notice"
                >
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Check size={14} color="#050912" />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I have read the local participation information and privacy notice.
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
    </PageShell>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    flexGrow: 1
  },
  mainLayout: {
    ...layout.contentSection(width),
    flexDirection: width > 900 ? 'row' : 'column',
    gap: layout.gap(width)
  },
  benefitsCol: {
    flex: width > 900 ? 1.2 : undefined
  },
  columnHeaderTitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
    marginBottom: 20
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width),
    marginBottom: 18,
    gap: 18
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  benefitContent: {
    flex: 1
  },
  benefitTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 6
  },
  benefitDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24
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
    marginTop: 10
  },
  verifiedText: {
    fontFamily: fonts.body,
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 24
  },
  formCol: {
    flex: width > 900 ? 1 : undefined
  },
  formCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  formTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: -0.3,
    marginBottom: 6
  },
  formSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 16,
    marginBottom: 24
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 8
  },
  provincePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  provinceChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    minHeight: 44
  },
  provinceChipActive: {
    backgroundColor: 'rgba(234, 254, 7, 0.12)',
    borderColor: colors.primary
  },
  provinceChipText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600'
  },
  provinceChipTextActive: {
    color: colors.primary,
    fontWeight: '700'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 18
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  checkboxLabel: {
    fontFamily: fonts.body,
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 24
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 4,
    minHeight: 44
  },
  submitBtnDisabled: {
    opacity: 0.6
  },
  formError: {
    color: colors.secondary,
    fontSize: 16,
    fontFamily: fonts.bodyMedium,
    marginBottom: 12
  },
  submitBtnText: {
    color: colors.ink,
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 16,
    letterSpacing: 0.8
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 30
  },
  successTitle: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 0.5,
    marginBottom: 8
  },
  successDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10
  },
  successSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    minHeight: 44
  },
  resetBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8
  },
});
