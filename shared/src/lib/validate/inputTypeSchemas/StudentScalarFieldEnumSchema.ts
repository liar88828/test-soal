import { z } from 'zod';

export const StudentScalarFieldEnumSchema = z.enum(['id','nis','namaLengkap','jenisKelamin','tanggalLahir','tempatLahir','kelas','jurusan','tahunMasuk','tahunKeluar','alamat','noHp','email','namaAyah','pekerjaanAyah','namaIbu','pekerjaanIbu','namaWali','pekerjaanWali','noHpWali','status','createdAt','updatedAt','idClass']);

export default StudentScalarFieldEnumSchema;
