#!/usr/bin/env python3
"""개발본(../three-seals)을 배포 폴더(docs/)로 동기화한다.

- index.html, service-worker.js, data/*.js 를 복사한다.
- docs/index.html 안의 `data/partN.js?v=dev` 를 해당 파일 내용의 해시로 바꾼다.
  → index.html 과 데이터 파일이 항상 같은 버전 쌍으로 내려가도록 보장(캐시 불일치 방지).
사용: python tools/sync.py   (저장소 루트에서)
"""
import hashlib, io, pathlib, re, shutil, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "three-seals"
DST = ROOT / "docs"

def main() -> int:
    if not (SRC / "index.html").exists():
        print(f"개발본을 찾을 수 없습니다: {SRC}", file=sys.stderr)
        return 1
    (DST / "data").mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SRC / "service-worker.js", DST / "service-worker.js")
    hashes = {}
    for f in sorted((SRC / "data").glob("*.js")):
        shutil.copyfile(f, DST / "data" / f.name)
        hashes[f.name] = hashlib.sha1(f.read_bytes()).hexdigest()[:10]
    html = io.open(SRC / "index.html", encoding="utf-8").read()
    refs = re.findall(r'src="data/([\w.-]+\.js)\?v=dev"', html)
    missing = [r for r in refs if r not in hashes]
    if missing:
        print(f"index.html 이 참조하는 데이터 파일이 없습니다: {missing}", file=sys.stderr)
        return 1
    unreferenced = [n for n in hashes if n not in refs]
    if unreferenced:
        print(f"경고: index.html 이 참조하지 않는 데이터 파일: {unreferenced}", file=sys.stderr)
    html = re.sub(r'src="data/([\w.-]+\.js)\?v=dev"', lambda m: f'src="data/{m.group(1)}?v={hashes[m.group(1)]}"', html)
    io.open(DST / "index.html", "w", encoding="utf-8", newline="").write(html)
    for n in refs:
        print(f"data/{n} v={hashes[n]}")
    print("동기화 완료 → docs/")
    return 0

if __name__ == "__main__":
    sys.exit(main())
