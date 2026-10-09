import { Pressable } from '../components/LocalizedPressable';
import { SPACE_APPS_EVENT } from '../content/event';
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
import { Rocket, Check, CheckCircle2, Calendar, MapPin } from '../components/icons';


const TRACKS = [
  { id: 'team', label: 'TEAM (2–6 MEMBERS)', desc: 'Compete as an organized squad' },
  { id: 'solo', label: 'SOLO / FIND A TEAM', desc: 'Join team matchmaking pool' },
];

const CHALLENGE_PREFS = [
  'Climate & Earth Observation',
  'AI / ML & Computer Vision',
  'Astrophysics & Space Flight',
  'Open Science & Citizen Data',
];

export default function RegisterPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [track, setTrack] = useState<'team' | 'solo'>('team');
  const [teamName, setTeamName] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [challengePref, setChallengePref] = useState(CHALLENGE_PREFS[0]);
  const [agreed, setAgreed] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const institutionRef = useRef<TextInput>(null);

  type Field = 'teamName' | 'leadName' | 'leadEmail' | 'leadPhone' | 'agreed' | 'memberCount' | 'institution';

  const validate = useCallback((): Errors<Field> => {
    const e: Errors<Field> = {};
    if (track === 'team' && !required(teamName)) e.teamName = 'Give your team a name.';
    if (!required(leadName)) e.leadName = 'We need a name for the entry.';
    if (!required(leadEmail)) e.leadEmail = 'An email is required so organisers can contact you.';
    else if (!isEmail(leadEmail)) e.leadEmail = 'That email address does not look right.';
    if (!isPhone(leadPhone)) e.leadPhone = 'Use a Sri Lankan number, e.g. 071 234 5678.';
    if (tooLong(teamName,120)) e.teamName = 'Please keep this under 120 characters.';
    if (tooLong(leadName,120)) e.leadName = 'Please keep this under 120 characters.';
    if (tooLong(institution,200)) e.institution = 'Please keep this under 200 characters.';
    if (track === 'team' && !/^[2-6]$/.test(memberCount)) e.memberCount = 'Enter the actual team size: 2 to 6 members.';
    if (!agreed) e.agreed = 'Please read and acknowledge the local notice to continue.';
    return e;
  }, [track, teamName, leadName, leadEmail, leadPhone, agreed, memberCount, institution]);

  const build = useCallback(
    () => ({
      track,
      teamName: track === 'team' ? teamName.trim() : null,
      memberCount: track === 'team' ? Number(memberCount) || null : 1,
      leadName: leadName.trim(),
      leadEmail: leadEmail.trim().toLowerCase(),
      leadPhone: leadPhone.trim() || null,
      institution: institution.trim() || null,
      challengePref,
      agreedToLocalNotice: agreed,
    }),
    [track, teamName, memberCount, leadName, leadEmail, leadPhone, institution, challengePref, agreed]
  );

  const { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap, attemptLocked } =
    useFormSubmit<Field>({ kind: 'registrations', validate, build });

  return (
    <PageShell
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Register | NASA Space Apps Challenge Kandy 2026"
        description="Express local interest in NASA Space Apps Kandy 2026. Official registration is a separate step."
        path="/register"
      />
      <Navbar />

      {/* Header Section */}
      <PageHeader number="08" eyebrow="LOCAL PARTICIPATION INTEREST" title={"Your next chapter\nstarts here."} description="Bring your team or come with an idea. Register your interest in joining the Kandy Space Apps community." />

      <View style={styles.mainContent}>
        {/* Left Column: Event Overview & Perks */}
        <View style={styles.leftColumn}>
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.livePulseDot} />
              <Text style={styles.cardTag}>HACKATHON DETAILS</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Calendar size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.infoLabel}>EVENT DATES</Text>
                <Text style={styles.infoValue}>{SPACE_APPS_EVENT.dateLabel}</Text>
                <Text style={styles.infoSub}>Official global event dates; local schedule to be announced</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.iconBox, { borderColor: 'rgba(46, 150, 245, 0.3)' }]}>
                <MapPin size={20} color={colors.secondary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.infoLabel}>LOCATION & FORMAT</Text>
                <Text style={styles.infoValue}>Kandy — venue to be announced</Text>
                <Text style={styles.infoSub}>Local format and accessibility details to be confirmed</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.benefitsTitle}>PARTICIPATION STEPS:</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.primary} />
                <Text style={styles.benefitText}>Create your account on the official Space Apps website</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.primary} />
                <Text style={styles.benefitText}>Complete official registration and select your event</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.primary} />
                <Text style={styles.benefitText}>Find or form a team through the official platform</Text>
              </View>
              <View style={styles.benefitItem}>
                <CheckCircle2 size={16} color={colors.primary} />
                <Text style={styles.benefitText}>Submit your project through the official platform</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Right Column: Registration Form */}
        <View style={[styles.card, styles.formCard]}>
          {submitted ? (
            <View style={styles.successContainer}>
              <CheckCircle2 size={56} color="#10B981" style={{ marginBottom: 16 }} />
              <Text style={styles.successTitle}>LOCAL INTEREST RECEIVED</Text>
              <Text style={styles.successText}>
                Your interest has been saved for the local organising team. This does not complete official Space Apps registration.
              </Text>
              <Text style={styles.successSub}>
                No confirmation email or toolkit delivery is implied by this receipt.
              </Text>
              <Pressable
                accessibilityRole="button"
                style={styles.resetBtn}
                onPress={() => {
                  reset();
                  setLeadName('');
                  setLeadEmail('');
                  setLeadPhone('');
                  setTeamName('');
                  setInstitution('');
                  setAgreed(false);
                  setMemberCount(''); setTrack('team'); setChallengePref(CHALLENGE_PREFS[0]);
                }}
              >
                <Text style={styles.resetBtnText}>SUBMIT ANOTHER INTEREST FORM</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.formTitle}>
                LOCAL INTEREST FORM
              </Text>
              <Text style={styles.formSubtitle}>
                This local interest form is separate from official Space Apps registration. Read the participation information before continuing.
              </Text>

              {/* Track Switcher */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>SELECT REGISTRATION TRACK</Text>
                <View style={styles.trackRow}>
                  {TRACKS.map((t) => {
                    const isSelected = track === t.id;
                    return (
                      <Pressable disabled={attemptLocked} aria-disabled={attemptLocked}
                        accessibilityRole="button"
                        key={t.id}
                        style={[styles.trackCard, isSelected && styles.trackCardActive]}
                        accessibilityState={{ selected: isSelected }}
                        aria-pressed={isSelected}
                        onPress={() => setTrack(t.id as 'team' | 'solo')}
                      >
                        <Text style={[styles.trackCardTitle, isSelected && styles.trackCardTitleActive]}>
                          {t.label}
                        </Text>
                        <Text style={styles.trackCardDesc}>{t.desc}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {!submissionsReady() && <Text style={styles.formSubtitle}>Local form submissions are currently paused. Please do not enter sensitive personal information.</Text>}
              {track === 'team' && (

                <FormField editable={!attemptLocked}
                  maxLength={120}
                  label="TEAM NAME"
                  required
                  placeholder="e.g. Orion Dynamics"
                  value={teamName}
                  error={errors.teamName}
                  onChangeText={(v) => {
                    setTeamName(v);
                    clearError('teamName');
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => nameRef.current?.focus()}
                />
              )}

              {track === 'team' && <FormField editable={!attemptLocked}  label="TEAM SIZE (2–6 MEMBERS)" required value={memberCount} maxLength={1} keyboardType="number-pad" error={errors.memberCount} onChangeText={(value) => { setMemberCount(value); clearError('memberCount'); }} />}
              {/* Leader Full Name */}
              <FormField editable={!attemptLocked}
                maxLength={120}
                  ref={nameRef}
                label={track === 'team' ? 'TEAM LEADER FULL NAME' : 'PARTICIPANT FULL NAME'}
                required
                placeholder="e.g. Navin Wijesinghe"
                value={leadName}
                error={errors.leadName}
                onChangeText={(v) => {
                  setLeadName(v);
                  clearError('leadName');
                }}
                autoComplete="name"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />

              {/* Email & Phone Row */}
              <View style={styles.twoColRow}>
                <View style={{ flex: 1 }}>
                  <FormField editable={!attemptLocked}
                    maxLength={200}
                  ref={emailRef}
                    label="EMAIL ADDRESS"
                    required
                    placeholder="navin@example.com"
                    value={leadEmail}
                    error={errors.leadEmail}
                    onChangeText={(v) => {
                      setLeadEmail(v);
                      clearError('leadEmail');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onSubmitEditing={() => phoneRef.current?.focus()}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <FormField editable={!attemptLocked}
                    maxLength={30}
                  ref={phoneRef}
                    label="PHONE NUMBER"
                    placeholder="071 234 5678"
                    value={leadPhone}
                    error={errors.leadPhone}
                    onChangeText={(v) => {
                      setLeadPhone(v);
                      clearError('leadPhone');
                    }}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                    returnKeyType="next"
                    onSubmitEditing={() => institutionRef.current?.focus()}
                  />
                </View>
              </View>

              {/* Institution / University */}
              <FormField editable={!attemptLocked}
                maxLength={200}
                  ref={institutionRef}
                label="SCHOOL / UNIVERSITY / EMPLOYER"
                placeholder="e.g. University of Moratuwa"
                value={institution}
                error={errors.institution}
                onChangeText={setInstitution}
                autoComplete="organization"
                returnKeyType="done"
              />

              {/* Challenge Preference */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PRIMARY CHALLENGE INTEREST</Text>
                <View style={styles.chipsRow}>
                  {CHALLENGE_PREFS.map((pref, idx) => {
                    const isSel = challengePref === pref;
                    return (
                      <Pressable disabled={attemptLocked} aria-disabled={attemptLocked}
                        accessibilityRole="button"
                        key={idx}
                        style={[styles.prefChip, isSel && styles.prefChipActive]}
                        accessibilityState={{ selected: isSel }}
                        aria-pressed={isSel}
                        onPress={() => setChallengePref(pref)}
                      >
                        <Text style={[styles.prefChipText, isSel && styles.prefChipTextActive]}>
                          {pref}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Agreement */}
              <Pressable disabled={attemptLocked} aria-disabled={attemptLocked}
                style={styles.checkboxRow}
                onPress={() => {
                  setAgreed(!agreed);
                  clearError('agreed');
                }}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreed }}
                aria-checked={agreed}
                accessibilityLabel="I have read the local participation information and privacy notice"
              >
                <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
                  {agreed && <Check size={14} color="#050912" />}
                </View>
                <Text style={styles.checkboxLabel}>
                  I have read the local participation information and privacy notice.
                </Text>
              </Pressable>
              {errors.agreed ? (
                <Text style={styles.fieldError} accessibilityRole="alert">
                  {errors.agreed}
                </Text>
              ) : null}


              <Link href="/privacy" accessibilityRole="link"><Text style={{ color: colors.primary, marginBottom: 12 }}>Privacy notice</Text></Link>
              <Link href="/participation" accessibilityRole="link"><Text style={{ color: colors.primary, marginBottom: 20 }}>Local participation information</Text></Link>
              {attemptLocked && <Text accessibilityLiveRegion="polite" aria-live="polite" style={styles.formSubtitle}>This attempt is locked while receipt is uncertain. Retry sends the same details. Do not reload or start another application.</Text>}
              <Honeypot value={trap} onChangeText={setTrap} />

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
                  {submitting ? 'SENDING\u2026' : 'SEND LOCAL INTEREST'}
                </Text>
                {submitting ? (
                  <ActivityIndicator size="small" color="#050912" style={{ marginLeft: 8 }} />
                ) : (
                  <Rocket size={16} color="#050912" style={{ marginLeft: 8 }} />
                )}
              </Pressable>
            </>
          )}
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
  mainContent: {
    ...layout.contentSection(width),
    flexDirection: width > 900 ? 'row' : 'column',
    gap: layout.gap(width)
  },
  leftColumn: {
    flex: width > 900 ? 1 : undefined
  },
  card: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },
  cardTag: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 4
  },
  infoValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.display
  },
  infoSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 20
  },
  benefitsTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 14
  },
  benefitsList: {
    gap: 12
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  benefitText: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 16
  },
  formCard: {
    flex: width > 900 ? 1.4 : undefined,
    backgroundColor: 'rgba(10, 15, 31, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)'
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
  trackRow: {
    flexDirection: width >= 1200 ? 'row' : 'column',
    gap: 12
  },
  trackCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  trackCardActive: {
    backgroundColor: 'rgba(234, 254, 7, 0.1)',
    borderColor: colors.primary
  },
  trackCardTitle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 4
  },
  trackCardTitleActive: {
    color: colors.primary
  },
  trackCardDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14
  },
  twoColRow: {
    flexDirection: width > 600 ? 'row' : 'column',
    gap: 12
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  prefChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minHeight: 44
  },
  prefChipActive: {
    backgroundColor: 'rgba(234, 254, 7, 0.12)',
    borderColor: colors.primary
  },
  prefChipText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600'
  },
  prefChipTextActive: {
    color: colors.primary,
    fontWeight: '700'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16
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
    marginTop: 8,
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
  fieldError: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    marginTop: -8,
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
    paddingVertical: 36
  },
  successTitle: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 0.5,
    marginBottom: 8
  },
  successText: {
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
