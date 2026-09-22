"""
FastAPI backend Mochammad Jiddan Armansyiah (JA) portfolio.
Single purpose: generate the CV PDF on the fly (/api/cv).

Runs as a Vercel Python Serverless Function (the `app` object below is the
ASGI entrypoint Vercel invokes). Also runnable locally with:
    uvicorn api.index:app --reload --port 8000
"""
from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
import os
import io
import logging

app = FastAPI(title="JA portfolio API")
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "JA portfolio API"}


def build_cv():
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.lib.colors import HexColor
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

    buf = io.BytesIO()
    rose = HexColor("#D45D79")
    plum = HexColor("#3D1F2B")
    mauve = HexColor("#8A6070")
    gold = HexColor("#C9A227")

    doc = SimpleDocTemplate(buf, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=16 * mm, bottomMargin=16 * mm,
                            title="Mochammad Jiddan Armansyiah - CV")
    name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=21, textColor=plum)
    tag = ParagraphStyle("tag", fontName="Helvetica-Oblique", fontSize=10.5, textColor=rose, spaceAfter=3)
    contact = ParagraphStyle("contact", fontName="Helvetica", fontSize=9, textColor=mauve, spaceAfter=2)
    h = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=12, textColor=rose, spaceBefore=12, spaceAfter=4)
    role = ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=10, textColor=plum, leading=13)
    body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, textColor=plum, leading=13)
    small = ParagraphStyle("small", fontName="Helvetica", fontSize=9, textColor=mauve, leading=12)

    story = []

    def item(title, meta, lines):
        story.append(Paragraph(title, role))
        story.append(Paragraph(meta, small))
        for ln in lines:
            story.append(Paragraph("&bull; " + ln, body))
        story.append(Spacer(1, 4))

    story.append(Paragraph("Mochammad Jiddan Armansyiah", name))
    story.append(Paragraph("Bridging businesses across borders through clear, professional communication.", tag))
    story.append(Paragraph("Malang, East Java, Indonesia &middot; noxjms@gmail.com &middot; linkedin.com/in/jiddan-armansyiah", contact))
    story.append(HRFlowable(width="100%", thickness=1.2, color=gold, spaceBefore=6, spaceAfter=2))

    story.append(Paragraph("Profile", h))
    story.append(Paragraph(
        "Diligent, detail-oriented graduate (July 2026) of English for Business and Professional Communication, "
        "State Polytechnic of Malang, with a keen interest in international trade, legal translation, immigration "
        "services, and global logistics. Experienced in cross-border documentation through an internship at a seafood "
        "exporter and the IISMA exchange program at The University of Western Australia.", body))

    story.append(Paragraph("Education", h))
    item("State Polytechnic of Malang - English for Business and Professional Communication",
         "Aug 2022 - Jul 2026 &middot; GPA 3.85/4.00",
         ["Business correspondence, intercultural communication, translation, public speaking, report writing.",
          "Export-import and global workplace case studies."])
    item("Republic Polytechnic, Singapore - Short Course: Communication in the Global Workplace", "2023", [])
    item("SMAS Katolik Cor Jesu Malang - Language and Culture", "Jun 2019 - May 2021", [])

    story.append(Paragraph("Professional Experience", h))
    item("PT Modern Mitra Sejati, Surabaya - Internship", "Jul 2025 - Nov 2025",
         ["Frozen seafood distributor exporting to Japan, Malaysia, and Hong Kong, with modern cold storage facilities.",
          "Supported export documentation and professional cross-border correspondence.",
          "Details of scope and results available on request."])
    item("PT Jaxer Group Indonesia, Jakarta - Freelance", "Nov 2025 - Jun 2026",
         ["ICT company focused on IT hardware production and digital education system development.",
          "Role details available on request."])
    item("CV Active Mitra Abadi - Pilates Instructor", "17 Jul 2026 - Present",
         ["Teaching Pilates sessions focused on posture, core strength, and safe, corrective movement."])

    story.append(Paragraph("International Experience - IISMA 2024, The University of Western Australia", h))
    item("IISMA Vocational 2024 - Student Representative (Vocational)", "Mar - Dec 2024",
         ["Liaison between IISMA students and program coordinators; represented the cohort in official meetings."])
    item("Industrial Exposure - Public Relations Intern", "Oct - Nov 2024",
         ["Email correspondence, merchandise coordination, front desk at Our Career Ready Sundowner."])
    item("Culturise Challenge - Event & Exhibition Division", "Aug - Sep 2024",
         ["Designed a traditional Indonesian culinary exhibition booth; coordinated traditional dance performances."])
    item("IISMA Social Campaign: Zero Hunger - Media & Communications", "May - Jun 2024",
         ["Produced digital communication materials and visual content with media partners."])
    item("Indonesia Future Development Project - Essay Writer & Editor", "Oct - Nov 2024",
         ["Wrote and edited a bilingual essay on the digital divide and e-commerce."])

    story.append(Paragraph("Leadership & Organization", h))
    item("English Student Association - Secretary, Research & Development Division", "2024/2025",
         ["Developed strategic work plans with the division head; managed division administration."])
    item("Keluarga Mahasiswa Katolik - Field Coordinator, Basic Leadership Training 2025", "Jan - Mar 2025",
         ["Led planning and execution of the leadership handover ceremony; coordinated rundown, technical needs, and logistics."])
    item("Night Gathering & English Sport Competition 2023 - Chief Committee", "2023",
         ["Developed the concept for both events and coordinated with division coordinators."])

    story.append(Paragraph("Skills", h))
    story.append(Paragraph(
        "Business communication &middot; legal/professional translation & documentation &middot; report writing & policy drafting &middot; "
        "public speaking & moderation &middot; event planning & coordination &middot; administrative management &middot; inventory & logistics management", body))
    story.append(Paragraph("Languages: Indonesian (native), English (advanced). Tools: Microsoft Office, Google Workspace, Canva, CapCut, Zoom/Teams.", small))

    story.append(Paragraph("Achievements", h))
    for a in ["Student with Highest Achievement Index - Odd Semester 2023/2024",
              "Student with Highest Achievement Index - Odd Semester 2022/2023",
              "Most Creative Promotion, TikTok Video Competition - Arrayan Executive Village, Batu (2023)",
              "2nd Best Business Plan Idea - Pre-Study Department of Business Administration (2022)",
              "Workshop: Stronger Spine & Better Posture - Pilates (Daniel Choi, FeelFit Journey, 2025)",
              "Workshop: Corrective Pilates Masterclass (Daniel Choi, FeelFit Journey, 2026)"]:
        story.append(Paragraph("&bull; " + a, body))

    story.append(Paragraph("Volunteering", h))
    story.append(Paragraph("Universal Open 2026 International Billiard Tournament, Jakarta (2026) &middot; Panti Asuhan Darul Jundi (2025) &middot; Perth Running Festival, Optus Stadium (2024) &middot; UWA Booksale for Save the Children Australia (2024)", body))

    doc.build(story)
    buf.seek(0)
    return buf


@api_router.get("/cv")
async def download_cv():
    buf = build_cv()
    return StreamingResponse(buf, media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=Jiddan_Armansyiah_CV.pdf"})


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
