import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, ActivityIndicator } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { Mail, MapPin, Send, CheckCircle2 } from '../components/icons';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../components/FormField';
import Honeypot from '../components/Honeypot';
import { useFormSubmit } from '../lib/useFormSubmit';
import { isEmail, required, tooLong, type Errors } from '../lib/validation';


const SUBJECTS = ['General Inquiry', 'Sponsorship & Partners', 'Media & Press', 'Team Question'];

export default function ContactPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');

  const emailRef = useRef<TextInput>(null);
  const messageRef = useRef<TextInput>(null);

  type Field = 'name' | 'email' | 'message';

  const validate = useCallback((): Errors<Field> => {
    const e: Errors<Field> = {};
    if (!required(name)) e.name = 'Tell us your name.';
    if (!required(email)) e.email = 'We need an email to reply to.';
    else if (!isEmail(email)) e.email = 'That email address does not look right.';
    if (!required(message)) e.message = 'Add a message so we know how to help.';
    else if (tooLong(message, 2000)) e.message = 'Please keep it under 2000 characters.';
    return e;
  }, [name, email, message]);

  const build = useCallback(
    () => ({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject,
      message: message.trim(),
    }),
    [name, email, subject, message]
  );

  const { errors, clearError, submitting, submitted, formError, submit, reset, trap, setTrap } =
    useFormSubmit<Field>({ kind: 'messages', validate, build });

  const sent = submitted;

  return (
    <PageShell
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Contact | NASA Space Apps Sri Lanka"
        description="Reach the NASA Space Apps Sri Lanka organising committee in Kandy. We reply within 24 hours."
        path="/contact"
      />
      <Navbar />

      {/* Header Section */}
      <PageHeader number="09" eyebrow="CONTACT THE TEAM" title={"Let’s start\na conversation."} description="Questions, ideas, or a possible collaboration? We’d love to hear from you." />

      <View style={styles.mainContent}>
        {/* Left Column: Contact Details & High-Tech Map Graphic */}
        <View style={styles.leftColumn}>
          {/* Info Card */}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Mail size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.infoLabel}>DIRECT EMAIL</Text>
                <Text style={styles.infoValue}>info@nasaspaceapps.lk</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.iconBox, { borderColor: 'rgba(46, 150, 245, 0.3)' }]}>
                <MapPin size={20} color={colors.secondary} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.infoLabel}>ORGANIZING HEADQUARTERS</Text>
                <Text style={styles.infoValue}>University of Peradeniya Campus, Kandy</Text>
                <Text style={styles.infoSubValue}>Central Province, Sri Lanka</Text>
              </View>
            </View>

            <Text style={[styles.infoLabel, { marginTop: 20, marginBottom: 10 }]}>CONNECT ON SOCIAL</Text>
            <View style={styles.socialIcons}>
              <Pressable accessibilityRole="button" style={styles.socialBox} accessibilityLabel="Facebook">
                <Ionicons name="logo-facebook" size={16} color={colors.textMuted} />
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.socialBox} accessibilityLabel="LinkedIn">
                <Ionicons name="logo-linkedin" size={16} color={colors.textMuted} />
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.socialBox} accessibilityLabel="Instagram">
                <Ionicons name="logo-instagram" size={16} color={colors.textMuted} />
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.socialBox} accessibilityLabel="Twitter / X">
                <Ionicons name="logo-twitter" size={16} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          {/* High-Tech Radar Map Card */}
          <View style={styles.mapCard}>
            <View style={styles.mapHeaderRow}>
              <View style={styles.livePulseDot} />
              <Text style={styles.mapHeaderTag}>KANDY RADAR BEACON • ACTIVE</Text>
            </View>

            <View style={styles.mapGraphic}>
              <View style={styles.mapOrbitCircle} />
              <View style={styles.mapOrbitInnerCircle} />
              <View style={styles.mapCrossH} />
              <View style={styles.mapCrossV} />

              {/* Pulsing Beacon Center */}
              <View style={styles.beaconPulse}>
                <View style={styles.mapNode} />
              </View>

              <View style={styles.mapNodeLabelBox}>
                <Text style={styles.mapNodeLabel}>HUB: KANDY HQ</Text>
              </View>
            </View>

            <View style={styles.mapFooter}>
              <Text style={styles.mapFooterText}>
                COORD: 7.29° N, 80.63° E  |  STATUS: ACTIVE
              </Text>
            </View>
          </View>
        </View>

        {/* Right Column: Inquiry Form */}
        <View style={[styles.card, styles.formCard]}>
          {sent ? (
            <View style={styles.successContainer}>
              <CheckCircle2 size={56} color="#10B981" style={{ marginBottom: 16 }} />
              <Text style={styles.successTitle}>MESSAGE DISPATCHED!</Text>
              <Text style={styles.successText}>
                Thank you, <Text style={{ color: colors.text, fontWeight: '700' }}>{name}</Text>. Your message concerning <Text style={{ color: colors.primary }}>{subject}</Text> has been received by our Kandy organizing secretariat.
              </Text>
              <Text style={styles.successSub}>
                We will reply to <Text style={{ color: colors.text }}>{email}</Text> within 24 hours.
              </Text>
              <Pressable
                accessibilityRole="button"
                style={styles.resetBtn}
                onPress={() => {
                  reset();
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
              >
                <Text style={styles.resetBtnText}>SEND ANOTHER MESSAGE</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.formTitle}>
                SEND US A <Text style={{ color: colors.primary }}>MESSAGE</Text>
              </Text>
              <Text style={styles.formSubtitle}>
                Our team monitors communications around the clock during hackathon preparations.
              </Text>

              <FormField
                label="FULL NAME"
                required
                placeholder="e.g. Priyantha Dissanayake"
                value={name}
                error={errors.name}
                onChangeText={(v) => {
                  setName(v);
                  clearError('name');
                }}
                autoComplete="name"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />

              <FormField
                ref={emailRef}
                label="EMAIL ADDRESS"
                required
                placeholder="priyantha@example.com"
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
                onSubmitEditing={() => messageRef.current?.focus()}
              />

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>SUBJECT CATEGORY</Text>
                <View style={styles.subjectsRow}>
                  {SUBJECTS.map((sub, idx) => {
                    const isSelected = subject === sub;
                    return (
                      <Pressable
                        accessibilityRole="button"
                        key={idx}
                        style={[styles.subjectChip, isSelected && styles.subjectChipActive]}
                        onPress={() => setSubject(sub)}
                      >
                        <Text style={[styles.subjectChipText, isSelected && styles.subjectChipTextActive]}>
                          {sub}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <FormField
                ref={messageRef}
                label="MESSAGE"
                required
                placeholder="How can our organizing committee assist you?"
                value={message}
                error={errors.message}
                onChangeText={(v) => {
                  setMessage(v);
                  clearError('message');
                }}
                multiline
                numberOfLines={4}
                maxLength={2000}
              />

              <Honeypot value={trap} onChangeText={setTrap} />

              {formError ? (
                <Text style={styles.formError} accessibilityRole="alert">
                  {formError}
                </Text>
              ) : null}

              <Pressable
                style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
                onPress={submit}
                disabled={submitting}
                accessibilityRole="button"
                accessibilityState={{ disabled: submitting, busy: submitting }}
              >
                <Text style={styles.submitBtnText}>
                  {submitting ? 'SENDING\u2026' : 'SEND MESSAGE'}
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
    ...layout.section(width),
    flexDirection: width > 900 ? 'row' : 'column',
    gap: layout.gap(width)
  },
  leftColumn: {
    flex: width > 900 ? 1 : undefined,
    gap: 24
  },
  card: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 22
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
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 4
  },
  infoValue: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700'
  },
  infoSubValue: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 12
  },
  socialBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapCard: {
    backgroundColor: 'rgba(7, 23, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    borderRadius: 8,
    padding: layout.cardPadding(width),
    alignItems: 'center'
  },
  mapHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981'
  },
  mapHeaderTag: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  mapGraphic: {
    width: 240,
    height: 180,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 15, 31, 0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)'
  },
  mapOrbitCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.15)'
  },
  mapOrbitInnerCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(46, 150, 245, 0.2)'
  },
  mapCrossH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  mapCrossV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  beaconPulse: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(234, 254, 7, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary
  },
  mapNodeLabelBox: {
    position: 'absolute',
    bottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary
  },
  mapNodeLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  mapFooter: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
    alignItems: 'center'
  },
  mapFooterText: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 0.8
  },
  formCard: {
    flex: width > 900 ? 1.2 : undefined,
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
  subjectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  subjectChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 4,
    minHeight: 44
  },
  subjectChipActive: {
    backgroundColor: 'rgba(234, 254, 7, 0.12)',
    borderColor: colors.primary
  },
  subjectChipText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600'
  },
  subjectChipTextActive: {
    color: colors.primary,
    fontWeight: '700'
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
