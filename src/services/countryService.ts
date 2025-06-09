

export interface Country {
  id: number;
  name: string;
}

export const getCountries = (): Country[] => {
  return [
    { id: 1, name: 'Argentina' },
    { id: 2, name: 'Uruguay' },
    { id: 3, name: 'Chile' },
    { id: 4, name: 'Brasil' },
    { id: 5, name: 'Bolivia' }
  ];
};