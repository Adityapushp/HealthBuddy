export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  notes?: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  notes?: string;
};
