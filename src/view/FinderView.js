import { $ } from "../utilities.js";

const FinderView = {
  renderKo() {
    $("#main-box").innerHTML = `
      <span id="settings"><img src="../img/langko.png" width="24"></span>
      <div id="header">
        <button class="menu-button" onclick="location.href='https://jbilee.github.io/dvc/calc/'">노력치 계산기</button>
        <button class="menu-button" disabled>성격 탐색기</button>
      </div>

      <div id="main-content">
        <div id="result">
        <div class="result-row">
          <strong>시작 성격:</strong> <div id="result__trait"></div>
        </div>
        <div class="result-row">
          <strong>시작 노력치:</strong> <div id="result__stats"></div>
        </div>
        </div>

        <div id="calculations">
          <h2 style="align-self: flex-start;">훈련된 수치:</h2>
          <div class="grid-container">
            <div>
              <div class="stat-label">순발력</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-agility"
                  class="stat-field agility">
              </div>
            </div>

            <div>
              <div class="stat-label">근력</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-strength"
                  class="stat-field strength">
              </div>
            </div>

            <div>
              <div class="stat-label">집중력</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-focus"
                  class="stat-field focus">
              </div>
            </div>

            <div>
              <div class="stat-label">지력</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-intellect"
                  class="stat-field intellect">
              </div>
            </div>
          </div>
        </div>

        <div id="controls">
          <div class="sel1">
            <h3>정보 입력:</h3>
            <select name="dragon-selector" id="dragon-selector">
              <option selected disabled>드래곤</option>
            </select>
            <select name="trait-selector" id="trait-selector">
              <option selected disabled>성격</option>
            </select>
          </div>
        </div>

        <div class="buttons">
          <button id="btn-find" class="primary">성격 찾기</button>
          <button id="btn-reset">입력 초기화</button> <br>
        </div>

        <div id="tips">
          <h2>[툴 이용가이드]</h2>
          <ul>
            <li>드래곤의 현재 예상 성격 중 일반 성격과 괄호 안에 있는 훈련된 수치를 입력합니다.</li>
            <li>에브리아 전용 드래곤은 기본치가 고정되어 있습니다: 순발력 1, 근력 1, 집중력 1, 지력 1</li>
          </ul>
        </div>
      </div>

      <div class="version">
        <p>
          version 1.2.3 (24-03-15)<br>
          <strong>DVC Calculator by <a href="https://github.com/jbilee">jbilee</a></strong>
        </p>
        <p>
          <strong>데이터 출처:</strong><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/2929"
            target="_blank">앙그라님의 전체도감</a><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/9761"
            target="_blank">앙그라님의 일반성격 계산법</a><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/113031"
            target="_blank">순대국밥할매님의 성격 정리</a><br>
        </p>
        <p>
          <strong>버그/데이터 오류 제보:</strong> <a href="https://open.kakao.com/o/stYLmUCf">오픈카톡</a>
        </p>
      </div>
    `;
  },
  renderEn() {
    $("#main-box").innerHTML = `
      <span id="settings"><img src="../img/langen.png" width="24"></span>
      <div id="header">
        <button class="menu-button" onclick="location.href='https://jbilee.github.io/dvc/calc/'">Calculator</button>
        <button class="menu-button" disabled>Finder</button>
      </div>

      <div id="main-content">
        <div id="result">
          <div class="result-row">
            <strong>Starting Personality:</strong> <div id="result__trait"></div>
          </div>
          <div class="result-row">
            <strong>Starting Effort Values:</strong> <div id="result__stats"></div>
          </div>
        </div>

        <div id="calculations">
          <h2 style="align-self: flex-start;">Trained Effort Values:</h2>
          <div class="grid-container">
            <div>
              <div class="stat-label">Agility</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-agility"
                  class="stat-field agility">
              </div>
            </div>

            <div>
              <div class="stat-label">Strength</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-strength"
                  class="stat-field strength">
              </div>
            </div>

            <div>
              <div class="stat-label">Focus</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-focus"
                  class="stat-field focus">
              </div>
            </div>

            <div>
              <div class="stat-label">Intellect</div>
              <div class="input-container">
                <input type="number" inputmode="numeric" min="0" max="999" value="0" id="start-intellect"
                  class="stat-field intellect">
              </div>
            </div>
          </div>
        </div>

        <div id="controls">
          <div class="sel1">
            <h3>Your dragon:</h3>
            <select name="dragon-selector" id="dragon-selector">
              <option selected disabled>Dragon</option>
            </select>
            <select name="trait-selector" id="trait-selector">
              <option selected disabled>Personality</option>
            </select>
          </div>
        </div>

        <div class="buttons">
          <button id="btn-find" class="primary">Find Personality</button>
          <button id="btn-reset">Reset</button> <br>
        </div>

        <div id="tips">
          <h2>[Tips]</h2>
          <ul>
            <li>Enter the Basic Personality from one of the dragon's current expected personalities, along with the trained Effort Values.</li>
            <li>By default, Evria-exclusives have 1, 1, 1, 1 as the base Effort Values.</li>
          </ul>
        </div>
      </div>

      <div class="version">
        <p>
          version 1.2.3 (24-03-15)<br>
          <strong>DVC Calculator by <a href="https://github.com/jbilee">jbilee</a></strong>
        </p>
        <p>
          <strong>Sources:</strong><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/2929"
            target="_blank">Dragondex by 앙그라</a><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/9761"
            target="_blank">Normal personality calculations by 앙그라</a><br>
          <a href="https://community.withhive.com/dvc/ko/board/22/113031"
            target="_blank">Personality requirements by 순대국밥할매</a><br>
        </p>
        <p>
          If you come across any bugs or other issues, please DM me on <a href="https://twitter.com/horocol">Twitter</a>!
        </p>
      </div>
    `;

    $("title").textContent = "DVC Finder";
  },
};

export default FinderView;
