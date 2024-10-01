import { LinkButton } from '@/components/common/LinkButton';
import { Section } from '@/components/common/Section';
import { Image, StyleSheet } from 'react-native';

export default function SuccessScreen() {
  return (
    <Section
      title="Buen trabajo!"
      subtitle="La orden ha sido marcada como completada."
      footer={<LinkButton href={'/'} text="Continuar" />}
    >
      <Image
        source={require('@/assets/images/felicitar.png')}
        style={styles.image}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginHorizontal: 'auto',
    marginTop: 36,
  },
});
