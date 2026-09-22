# Deploy ke Vercel

Struktur: frontend React (CRA+CRACO) di `frontend/`, backend FastAPI (generate CV PDF)
sebagai serverless function di `api/index.py`. Routing & build diatur `vercel.json`.

## Langkah
1. Push repo ini ke GitHub (JANGAN commit `node_modules` / `frontend/build`).
2. Vercel > Add New > Project > import repo.
3. Root Directory: biarkan default (root repo). Jangan diarahkan ke `frontend/`.
4. Deploy. `vercel.json` sudah mengatur:
   - build: `cd frontend && npm install --legacy-peer-deps && npm run build`
   - output: `frontend/build`
   - rewrite: `/api/*` -> serverless function `api/index.py`
5. Env di Vercel: tidak wajib. `CORS_ORIGINS` opsional (default `*`).

Frontend memanggil API same-origin (`/api/cv`) karena `REACT_APP_BACKEND_URL` dikosongkan.

## Jalan lokal
Backend:  `pip install -r requirements.txt && uvicorn api.index:app --reload --port 8000`
Frontend: `cd frontend && npm install --legacy-peer-deps && npm start`
(untuk tes tombol Download CV secara lokal, set `REACT_APP_BACKEND_URL=http://localhost:8000` di `frontend/.env`)

## Catatan
- MongoDB dihapus: tidak pernah dipakai dan bikin crash di serverless.
- `requirements.txt` diramping ke `fastapi` + `reportlab` (hindari limit 250MB Vercel).
- `overrides` ajv di `frontend/package.json` wajib ada — memperbaiki build CRA 5 di Node 18+/22.

---

## Deploy ke Netlify (nama-project.netlify.app)

Project ini **100% siap di-deploy ke Netlify** karena frontend bersifat Client-Side React SPA dan file CV PDF (`Jiddan_Armansyiah_CV.pdf`) sudah tersedia di folder `frontend/public/`.

Konfigurasi [`netlify.toml`](file:///c:/Users/JiddanPC/Downloads/Compressed/Queena_Portofolio-main/Queena_Portofolio-main/netlify.toml) sudah otomatis mengatur:
- `base = "frontend"`
- `command = "npm install --legacy-peer-deps && npm run build"`
- `publish = "build"`
- Redirect SPA `/*` -> `/index.html` (status 200)
- Environment `NPM_FLAGS = "--legacy-peer-deps"` dan `CI = "false"`

### Cara Deploy di Netlify:
1. **Opsi 1 (Otomatis via GitHub - Direkomendasikan):**
   - Push repository ini ke GitHub.
   - Buka [app.netlify.com](https://app.netlify.com/) -> **Add new site** -> **Import an existing project**.
   - Pilih repository GitHub Anda.
   - Netlify akan otomatis mendeteksi file `netlify.toml` dan mengatur setting build.
   - Klik **Deploy site**.
   - Website akan aktif di subdomain acak, Anda bisa ubah nama subdomainnya di **Site configuration > Change site name** menjadi `jiddan-portfolio.netlify.app` (atau nama lain yang Anda inginkan).

2. **Opsi 2 (Netlify CLI):**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

