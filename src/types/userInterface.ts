export default interface IUser {
  name: string;
  role: 'Doctor' | 'Patient' | '';
  uid?: string;
  age: number;
  sex: 'Male' | 'Female' | 'Transgender' | '';
  phoneNumber: string;
  address?: string;
  dateOfBirth?: string;
  docSignature?: string;
  docSpeciality?: string;
  docLicense?: string;
}
