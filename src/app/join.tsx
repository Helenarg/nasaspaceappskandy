import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, TextInput, ActivityIndicator } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import FormField from '../components/FormField';
import Honeypot from '../components/Honeypot';
import { useFormSubmit } from '../lib/useFormSubmit';
import { isEmail, isPhone, required, type Errors } from '../lib/validation';
import { fonts } from '../theme/typography';
import { Users, BrainCircuit, Laptop, Send, CheckCircle2, Check } from '../components/icons';


const VOLUNTEER_SKILLS = [
  'Event Logistics & Operations',
  'Technical Helpdesk & Wi-Fi',
  'Social Media & Live Coverage',
  'Graphic Design & Media Assets',
  'Participant Registration Desk',
  'Stage & Audio-Visual Crew',
];

const MENTOR_SKILLS = [
  'Data Science & Python',
  'Machine Learning & Computer Vision',
  'Earth Observation & Geospatial GIS',
  'Astrophysics & Space Dynamics',
  'Cloud Architecture & NASA APIs',
  'Pitch Coaching & Product Strategy',
];

const DATES = [
  { id: 'oct3', label: 'Oct 3 (Day 1 • Kickoff & Formation)' },
  { id: 'oct4', label: 'Oct 4 (Day 2 • 24H Sprint & Mentorship)' },
  { id: 'oct5', label: 'Oct 5 (Day 3 • Final Pitching & Awards)' },
];

export default function JoinUsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [activeTab, setActiveTab] = useState<'volunteer' | 'mentor'>('volunteer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>(['oct3', 'oct4', 'oct5']);

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const affiliationRef = useRef<TextInput>(null);

  type Field = 'fullName' | 'email' | 'phone' | 'skills' | 'dates';

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleDate = (id: string) => {
    setSelectedDates((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const validate = useCallback((): Errors<Field> => {
    const e: Errors<Field> = {};
    if (!required(fullName)) e.fullName = 'We need your name.';
    if (!required(email)) e.email = 'An email is required so we can reach you.';
    else if (!isEmail(email)) e.email = 'That email address does not look right.';
    if (!isPhone(phone)) e.phone = 'Use a Sri Lankan number, e.g. 071 234 5678.';
    if (selectedSkills.length === 0) e.skills = 'Pick at least one skill so we can place you.';
    if (selectedDates.length === 0) e.dates = 'Pick at least one day you can help.';
    return e;
  }, [fullName, email, phone, selectedSkills, selectedDates]);

  const build = useCallback(
    () => ({
      role: activeTab,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || null,
      affiliation: affiliation.trim() || null,
      skills: selectedSkills,
      availability: selectedDates,
    }),
    [activeTab, fullName, email, phone, affiliation, selectedSkills, selectedDates]
  );

  const { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap } =
    useFormSubmit<Field>({ kind: 'volunteers', validate, build });

  const currentSkills = activeTab === 'volunteer' ? VOLUNTEER_SKILLS : MENTOR_SKILLS;

  return (
    <PageShell
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Volunteer & Mentor | NASA Space Apps Sri Lanka"
        description="Join the local organising crew as a volunteer, mentor or judge for NASA Space Apps Kandy 2026."
        path="/join"
      />
      <Navbar />

      {/* Header Section */}
      <PageHeader number="05" eyebrow="VOLUNTEERS & MENTORS" title={"Your experience.\nTheir next breakthrough."} description="Share your time, skills, and perspective. Help make the Kandy hackathon an inspiring experience for everyone."><View style={styles.tabToggleBar}>
          <Pressable
            accessibilityRole="button"
            style={[styles.tabButton, activeTab === 'volunteer' && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab('volunteer');
              setSelectedSkills([]);
            }}
          >
            <Users size={16} color={activeTab === 'volunteer' ? colors.ink : colors.textMuted} />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'volunteer' && styles.tabButtonTextActive,
              ]}
            >
              APPLY AS VOLUNTEER
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={[styles.tabButton, activeTab === 'mentor' && styles.tabButtonActiveCoral]}
            onPress={() => {
              setActiveTab('mentor');
              setSelectedSkills([]);
            }}
          >
            <BrainCircuit size={16} color={activeTab === 'mentor' ? colors.ink : colors.textMuted} />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'mentor' && styles.tabButtonTextActive,
              ]}
            >
              APPLY AS MENTOR / JUDGE
            </Text>
          </Pressable>
        </View></PageHeader>

      {/* Main Split Content */}
      <View style={styles.mainLayout}>
        {/* Left Column: Role Details & Futuristic Tech Visual */}
        <View style={styles.leftCol}>
          <View style={styles.roleVisualCard}>
            <View style={styles.roleCardTop}>
              <View style={styles.liveRoleDot} />
              <Text style={styles.roleCardTag}>
                {activeTab === 'volunteer' ? 'VOLUNTEER TRACK' : 'TECHNICAL MENTOR TRACK'}
              </Text>
            </View>

            <Text style={styles.roleCardTitle}>
              {activeTab === 'volunteer'
                ? 'Empower 500+ Innovators on the Ground'
                : 'Guide the Next Generation of Space Engineers'}
            </Text>

            <Text style={styles.roleCardDesc}>
              {activeTab === 'volunteer'
                ? 'Join our operations battalion managing registration, live audio/visual streams, participant support booths, and hackathon logistics at the Kandy Convention Center.'
                : 'Offer guidance, code review, and architectural advice to student teams solving complex challenges using NASA Earth observation and deep-space telemetry datasets.'}
            </Text>

            {/* Futuristic Tech Mentor Graphic Box */}
            <View style={styles.mentorGraphicBox}>
              <View style={styles.laptopFrame}>
                <Laptop size={36} color={activeTab === 'volunteer' ? colors.primary : colors.secondary} />
                <View style={styles.codeSnippetBox}>
                  <Text style={styles.codeLine}>&gt; NASA_API.init(mode: &quot;OPEN_DATA&quot;)</Text>
                  <Text style={styles.codeLine}>&gt; connect(hub: &quot;KANDY_2026&quot;)</Text>
                  <Text style={[styles.codeLine, { color: colors.primary }]}>&gt; STATUS: 9 PROVINCES READY</Text>
                </View>
              </View>
            </View>

            {/* Perks Checklist */}
            <View style={styles.perksList}>
              <View style={styles.perkItem}>
                <CheckCircle2 size={18} color={colors.primary} />
                <Text style={styles.perkText}>Official NASA Organizing Crew Credential</Text>
              </View>
              <View style={styles.perkItem}>
                <CheckCircle2 size={18} color={colors.primary} />
                <Text style={styles.perkText}>Full 48-Hour Event Catering & Swag Kit</Text>
              </View>
              <View style={styles.perkItem}>
                <CheckCircle2 size={18} color={colors.primary} />
                <Text style={styles.perkText}>Direct VIP Networking with NASA Global Nominees</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Right Column: Interactive Form */}
        <View style={styles.rightCol}>
          <View style={styles.formCard}>
            {submitted ? (
              <View style={styles.successBox}>
                <CheckCircle2 size={54} color="#10B981" style={{ marginBottom: 16 }} />
                <Text style={styles.successTitle}>APPLICATION RECEIVED!</Text>
                <Text style={styles.successMsg}>
                  Thank you, <Text style={{ color: colors.text, fontWeight: '700' }}>{fullName}</Text>. Your application to join as a{' '}
                  <Text style={{ color: colors.primary, fontWeight: '700' }}>
                    {activeTab === 'volunteer' ? 'Volunteer' : 'Technical Mentor'}
                  </Text>{' '}
                  has been queued for review.
                </Text>
                <Text style={styles.successSub}>
                  Our organizing leads will email you briefing materials and schedule your orientation call.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  style={styles.resetBtn}
                  onPress={() => {
                    reset();
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setAffiliation('');
                    setSelectedSkills([]);
                  }}
                >
                  <Text style={styles.resetBtnText}>SUBMIT ANOTHER RESPONSE</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.formTitle}>
                  {activeTab === 'volunteer' ? 'VOLUNTEER' : 'MENTOR'} APPLICATION
                </Text>
                <Text style={styles.formSub}>
                  Please complete the details below to join our team for Kandy 2026.
                </Text>

                {/* Name */}
                <FormField
                  label="FULL NAME"
                  required
                  placeholder="e.g. Ruwan Senanayake"
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
                  placeholder="ruwan@example.com"
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
                  onSubmitEditing={() => affiliationRef.current?.focus()}
                />

                {/* Institution / Company */}
                <FormField
                  ref={affiliationRef}
                  label="ORGANIZATION / UNIVERSITY"
                  placeholder="e.g. IFS Sri Lanka / University of Colombo"
                  value={affiliation}
                  onChangeText={setAffiliation}
                  autoComplete="organization"
                  returnKeyType="done"
                />

                {/* Skills Checklist */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>SELECT YOUR CORE SKILLS</Text>
                  <View style={styles.checkboxGroup}>
                    {currentSkills.map((skill, idx) => {
                      const isSel = selectedSkills.includes(skill);
                      return (
                        <Pressable
                          accessibilityRole="button"
                          key={idx}
                          style={[styles.skillChip, isSel && styles.skillChipActive]}
                          onPress={() => toggleSkill(skill)}
                        >
                          <View style={[styles.miniCheck, isSel && styles.miniCheckActive]}>
                            {isSel && <Check size={10} color="#050912" />}
                          </View>
                          <Text style={[styles.skillChipText, isSel && styles.skillChipTextActive]}>
                            {skill}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Availability Checklist */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>AVAILABILITY SCHEDULE (OCT 3–5)</Text>
                  <View style={styles.datesList}>
                    {DATES.map((d) => {
                      const isSel = selectedDates.includes(d.id);
                      return (
                        <Pressable
                          accessibilityRole="button"
                          key={d.id}
                          style={styles.dateRow}
                          onPress={() => toggleDate(d.id)}
                        >
                          <View style={[styles.dateCheckbox, isSel && styles.dateCheckboxActive]}>
                            {isSel && <Check size={12} color="#050912" />}
                          </View>
                          <Text style={styles.dateLabel}>{d.label}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Honeypot value={trap} onChangeText={setTrap} />

                {errors.skills ? (
                  <Text style={styles.formError} accessibilityRole="alert">
                    {errors.skills}
                  </Text>
                ) : null}
                {errors.dates ? (
                  <Text style={styles.formError} accessibilityRole="alert">
                    {errors.dates}
                  </Text>
                ) : null}
                {formError ? (
                  <Text style={styles.formError} accessibilityRole="alert">
                    {formError}
                  </Text>
                ) : null}

                {/* Submit Button */}
                <Pressable
                  style={[
                    styles.submitBtn,
                    activeTab === 'mentor' && styles.submitBtnCoral,
                    submitting && styles.submitBtnDisabled,
                  ]}
                  onPress={submit}
                  disabled={submitting}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: submitting, busy: submitting }}
                >
                  <Text style={styles.submitBtnText}>
                    {submitting
                      ? 'SENDING\u2026'
                      : activeTab === 'volunteer'
                        ? 'SUBMIT VOLUNTEER FORM'
                        : 'SUBMIT MENTOR APPLICATION'}
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
  tabToggleBar: {
    flexDirection: width > 480 ? 'row' : 'column',
    alignSelf: width > 480 ? 'center' : 'stretch',
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: width > 480 ? 30 : 18,
    padding: 6,
    gap: 8
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: width > 480 ? 24 : 14
  },
  tabButtonActive: {
    backgroundColor: colors.primary
  },
  tabButtonActiveCoral: {
    backgroundColor: colors.secondary
  },
  tabButtonText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  tabButtonTextActive: {
    color: colors.ink
  },
  mainLayout: {
    ...layout.section(width),
    flexDirection: width > 900 ? 'row' : 'column',
    gap: layout.gap(width)
  },
  leftCol: {
    flex: width > 900 ? 1.1 : undefined
  },
  roleVisualCard: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  roleCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14
  },
  liveRoleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },
  roleCardTag: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2
  },
  roleCardTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    fontFamily: fonts.display,
    lineHeight: 30,
    marginBottom: 12
  },
  roleCardDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 26
  },
  mentorGraphicBox: {
    backgroundColor: 'rgba(7, 23, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 26
  },
  laptopFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  codeSnippetBox: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    padding: 10
  },
  codeLine: {
    color: colors.textMuted,
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 16
  },
  perksList: {
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 20
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  perkText: {
    fontFamily: fonts.bodyMedium,
    color: colors.text,
    fontSize: 13,
    fontWeight: '600'
  },
  rightCol: {
    flex: width > 900 ? 1.3 : undefined
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
  formSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 24
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 8
  },
  checkboxGroup: {
    gap: 8
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 44
  },
  skillChipActive: {
    backgroundColor: 'rgba(234, 254, 7, 0.1)',
    borderColor: 'rgba(234, 254, 7, 0.35)'
  },
  miniCheck: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  miniCheckActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  skillChipText: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12
  },
  skillChipTextActive: {
    color: colors.text,
    fontWeight: '700'
  },
  datesList: {
    gap: 10
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  dateCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateCheckboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  dateLabel: {
    fontFamily: fonts.body,
    color: colors.text,
    fontSize: 12
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 4,
    marginTop: 10,
    minHeight: 44
  },
  submitBtnCoral: {
    backgroundColor: colors.secondary
  },
  submitBtnDisabled: {
    opacity: 0.6
  },
  formError: {
    color: colors.secondary,
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    marginBottom: 12
  },
  submitBtnText: {
    color: colors.ink,
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 0.8
  },
  successBox: {
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
  successMsg: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10
  },
  successSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
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
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8
  },
});
