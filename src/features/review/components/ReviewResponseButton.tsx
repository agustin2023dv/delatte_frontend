import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IReview } from '@delatte/shared/interfaces';

type Props = {
  review: IReview;
  onPress: () => void;
};

const ReviewResponseButton = ({ review, onPress }: Props) => {
  const yaRespondidas = review.respuestas && review.respuestas.length > 0;
  if (yaRespondidas) return null;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Responder</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReviewResponseButton;
