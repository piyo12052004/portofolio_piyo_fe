<template>
  <div class="card m-4">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Informasi Pendaftaran</Tab>
        <Tab value="1">Syarat Pendaftaran</Tab>
        <Tab value="2">Panduan Pembayaran</Tab>
      </TabList>

      <TabPanels>
        <!-- ================= TAB 1 ================= -->
        <TabPanel value="0">
          <ScrollPanel style="width: 100%; height: 500px">
            <div class="space-y-4 leading-relaxed">
              <p>
                Selamat datang di halaman <b>Informasi Pendaftaran</b>. Berikut adalah
                tata cara, jadwal, serta informasi biaya pendaftaran yang perlu diketahui
                sebelum mengikuti proses pendaftaran online.
              </p>

              <div>
                <b>Tata Cara Pendaftaran Akun</b>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>Klik menu <b>Pendaftaran</b> pada halaman utama website</li>
                  <li>Pilih menu <b>Daftar Siswa</b></li>
                  <li>Klik <b>Registrasi</b></li>
                  <li>Isi data diri calon peserta didik dengan lengkap</li>
                  <li>Klik tombol <b>Simpan</b></li>
                  <li>Tunggu proses verifikasi akun oleh admin (maksimal 1x24 jam)</li>
                  <li>Login ke dashboard untuk melanjutkan proses pembayaran</li>
                </ol>
              </div>

              <div>
                <b>Jadwal Pendaftaran</b>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>Gelombang 1: 10 Juli 2025 – 10 Agustus 2025</li>
                  <li>Gelombang 2: 11 Agustus 2025 – 21 September 2025</li>
                  <li>
                    Verifikasi Data & Dokumen: Maksimal 1x24 jam setelah pendaftaran
                  </li>
                </ol>
              </div>

              <div>
                <b>Biaya Pendaftaran</b>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>Gelombang 1: Rp 20.000,-</li>
                  <li>Gelombang 2: Rp 30.000,-</li>
                </ol>
              </div>

              <hr />

              <p>
                Pembayaran dilakukan melalui sistem pembayaran online menggunakan
                <b>Midtrans</b>. Setelah pembayaran berhasil, status pendaftaran akan
                terverifikasi secara otomatis.
              </p>
            </div>
          </ScrollPanel>
        </TabPanel>

        <!-- ================= TAB 2 ================= -->
        <TabPanel value="1">
          <ScrollPanel style="width: 100%; height: 500px">
            <div class="space-y-4 leading-relaxed">
              <p>Adapun syarat pendaftaran sebagai berikut:</p>

              <div>
                <b>Ketentuan Pendaftar</b>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>Lulusan SD/MI atau sederajat</li>
                  <li>Usia maksimal 15 tahun saat pendaftaran</li>
                  <li>Sehat jasmani dan rohani</li>
                  <li>Mengisi formulir pendaftaran secara lengkap</li>
                  <li>Bersedia mematuhi peraturan dan tata tertib sekolah</li>
                </ol>
              </div>

              <div>
                <b>Dokumen yang Harus Disiapkan</b>
                <ol class="list-decimal pl-6 mt-2 space-y-1">
                  <li>Akta Kelahiran</li>
                  <li>Kartu Keluarga (KK)</li>
                  <li>Ijazah</li>
                  <li>Pas Foto berwarna ukuran 3x4 (background merah)</li>
                </ol>
                <p class="text-sm text-gray-600 mt-2">
                  Format file: PDF/JPG, maksimal 2 MB per file.
                </p>
              </div>

              <hr />

              <p>
                <b>Catatan:</b> Seluruh dokumen diunggah saat proses pengisian formulir
                pendaftaran online. Data yang tidak lengkap atau tidak sesuai ketentuan
                dapat menyebabkan pendaftaran ditolak.
              </p>
            </div>
          </ScrollPanel>
        </TabPanel>

        <!-- ================= TAB 3 ================= -->
        <TabPanel value="2">
          <ScrollPanel style="width: 100%; height: 500px">
            <div class="space-y-4 leading-relaxed">
              <p>Berikut tata cara pembayaran melalui <b>Midtrans</b>:</p>

              <ol class="list-decimal pl-6 mt-2 space-y-1">
                <li>Klik menu <b>Pembayaran</b> pada website</li>
                <li>Pilih menu <b>Bayar Sekarang</b></li>
                <li>Pilih metode pembayaran yang tersedia</li>
                <li>Ikuti instruksi pembayaran sesuai metode yang dipilih</li>
                <li>Segarkan (refresh) halaman website</li>
                <li>Status pembayaran akan berubah otomatis jika pembayaran berhasil</li>
                <li>
                  Peserta dapat melanjutkan pengisian formulir dan melengkapi dokumen
                </li>
              </ol>

              <hr />

              <p>
                <b>Catatan:</b> Pengumuman penerimaan siswa akan dikirimkan melalui email
                yang terdaftar.
              </p>
            </div>
          </ScrollPanel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import ScrollPanel from "primevue/scrollpanel";
</script>
