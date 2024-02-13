import {
  $,
  $$,
  newElem,
  forceNumberInput,
  validateInput,
  handleDecreaseButton,
  handleIncreaseButton,
} from "../utilities.js";

class ScheduleCard {
  constructor(index, { missions, bonusDragons }, updateSchedule) {
    this.actionCount = Array(5).fill(0);
    this.dragonCount = Array(6).fill(0);
    this.bonusPercentages = Array(6).fill(0);
    this.dailyTotal = 0;
    this.baseRewards = missions.reduce((arr, cur) => {
      arr.push(cur.baseReward);
      return arr;
    }, []);
    this.render(index, missions, bonusDragons, updateSchedule);
  }

  getBonusPercentage(count) {
    switch (count) {
      case 0: {
        return 0;
      }
      case 1: {
        return 20;
      }
      case 2: {
        return 30;
      }
      case 3: {
        return 40;
      }
      default: {
        const additions = count - 3;
        return 40 + additions;
      }
    }
  }

  getRewardPoints(bonus) {
    return this.baseRewards.map(
      (points) => points + Math.round(points * (bonus / 100))
    );
  }

  getTotalBonus() {
    return this.bonusPercentages.reduce((sum, cur) => sum + cur, 0);
  }

  updateTotalPoints(parent, updateSchedule) {
    const totalBonus = this.getTotalBonus();
    const rewardPoints = this.getRewardPoints(totalBonus);
    this.dailyTotal = rewardPoints
      .map((points, i) => points * this.actionCount[i])
      .reduce((sum, cur) => sum + cur, 0);

    parent.querySelector(".total-points").textContent = this.dailyTotal;
    updateSchedule();
  }

  updateRewardValues(parent, index) {
    const bonusPercentage = this.getBonusPercentage(this.dragonCount[index]);
    this.bonusPercentages[index] = bonusPercentage;
    const totalBonus = this.getTotalBonus();

    const bonusRows = parent.querySelectorAll(".row__bonus");
    bonusRows[index].querySelector(".bonus-value").textContent =
      bonusPercentage;

    const rewardPoints = this.getRewardPoints(totalBonus);
    const rewardRows = parent.querySelectorAll(".row__mission");
    rewardRows.forEach((row, i) => {
      row.querySelector(".rewards-value").textContent = rewardPoints[i];
    });

    parent.querySelector(".total-bonuses").textContent = totalBonus;
  }

  render(index, missions, dragons, updateSchedule) {
    // Each schedule card
    const newCard = newElem("div");
    newCard.classList.add("card");

    const header = newElem("h2");
    header.textContent = "D" + (index + 1);
    newCard.append(header);

    // Fill card with content
    missions.forEach((mission, i) => {
      const div = newElem("div");
      div.classList.add("row__mission");
      div.innerHTML = `${mission.action}<br><span class="rewards-value">${
        mission.baseReward
      }</span>포인트<br><button class="btn-input down">▼</button><div class="input-wrapper"><input type="text" inputmode="numeric" placeholder="0"></div><button class="btn-input up">▲</button>/${
        mission.limit > 0 ? mission.limit : "∞"
      }회`;
      newCard.append(div);

      const inputElem = div.querySelector("input");
      inputElem.addEventListener("input", () => forceNumberInput(inputElem));
      inputElem.addEventListener("change", () => {
        const result = validateInput(
          inputElem.value,
          mission.limit > 0 ? mission.limit : 999999999
        );
        inputElem.value = result;
        this.actionCount[i] = result;
        this.updateTotalPoints(newCard, updateSchedule);
      });

      const downbtn = div.querySelector(".down");
      downbtn.addEventListener("click", () => {
        handleDecreaseButton(inputElem, 0);
        this.actionCount[i] = Number(inputElem.value);
        this.updateTotalPoints(newCard, updateSchedule);
      });

      const upbtn = div.querySelector(".up");
      upbtn.addEventListener("click", () => {
        handleIncreaseButton(
          inputElem,
          mission.limit > 0 ? mission.limit : 999999999
        );
        this.actionCount[i] = Number(inputElem.value);
        this.updateTotalPoints(newCard, updateSchedule);
      });
    });

    // Bonus dragons
    dragons.forEach((dragon, i) => {
      const div = newElem("div");
      div.classList.add("row__bonus");
      div.innerHTML = `${dragon} (+ <span class="bonus-value">0</span>%) <button class="btn-input down">▼</button><div class="input-wrapper"><input type="text" inputmode="numeric" placeholder="0"></div><button class="btn-input up">▲</button>마리`;
      newCard.append(div);

      const inputElem = div.querySelector("input");
      inputElem.addEventListener("input", () => forceNumberInput(inputElem));
      inputElem.addEventListener("change", () => {
        const result = validateInput(inputElem.value, 50);
        inputElem.value = result;
        this.dragonCount[i] = result;
        this.updateRewardValues(newCard, i);
        this.updateTotalPoints(newCard, updateSchedule);
      });

      const downbtn = div.querySelector(".down");
      downbtn.addEventListener("click", () => {
        handleDecreaseButton(inputElem, 0);
        this.dragonCount[i] = Number(inputElem.value);
        this.updateRewardValues(newCard, i);
        this.updateTotalPoints(newCard, updateSchedule);
      });

      const upbtn = div.querySelector(".up");
      upbtn.addEventListener("click", () => {
        handleIncreaseButton(inputElem, 50);
        this.dragonCount[i] = Number(inputElem.value);
        this.updateRewardValues(newCard, i);
        this.updateTotalPoints(newCard, updateSchedule);
      });
    });

    const bonus = newElem("div");
    bonus.innerHTML = `보너스: <span class="total-bonuses">0</span>%`;
    newCard.append(bonus);

    const total = newElem("div");
    total.innerHTML = `일일 합계: <span class="total-points">0</span>`;
    newCard.append(total);

    $(".card-container").append(newCard);
  }
}

export default ScheduleCard;
