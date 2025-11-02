import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  gameState = signal('welcome');
  instructionsVisible = signal(false);
  
  // Settings
  stage1DurationMinutes = signal(5);
  stage2DurationSeconds = signal(30);
  tableSize = signal(5);
  
  // Game State
  table = signal([]);
  timer = signal(0);
  targetNumber = signal(1);
  foundCount = signal(0);
  wrongClickCell = signal(null);
  
  timerInterval;
  stage1TableRefreshInterval;

  totalCells = computed(() => this.tableSize() * this.tableSize());
  progress = computed(() => (this.foundCount() / this.totalCells()) * 100);

  ngOnInit() {
    this.generateTable();
  }

  ngOnDestroy() {
    this.clearAllIntervals();
  }

  showInstructions() {
    this.instructionsVisible.set(true);
  }

  hideInstructions() {
    this.instructionsVisible.set(false);
  }

  generateTable() {
    const size = this.tableSize();
    const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
    
    // Fisher-Yates Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const newTable = [];
    const centerIndex = Math.floor(size / 2);
    const lastIndex = size - 1;

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const isCorner = (i === 0 || i === lastIndex) && (j === 0 || j === lastIndex);
        row.push({
          value: numbers[i * size + j],
          isCenter: i === centerIndex && j === centerIndex,
          isCorner: isCorner,
          isFound: false,
        });
      }
      newTable.push(row);
    }
    this.table.set(newTable);
  }

  startTraining() {
    this.gameState.set('stage1');
    this.timer.set(this.stage1DurationMinutes() * 60);
    this.startTimer(() => this.startStage2());
    
    this.stage1TableRefreshInterval = setInterval(() => {
      this.generateTable();
    }, 10000); // Refresh table every 10 seconds
  }
  
  startStage2() {
    this.clearAllIntervals();
    this.generateTable();
    this.gameState.set('stage2');
    this.targetNumber.set(1);
    this.foundCount.set(0);
    this.timer.set(this.stage2DurationSeconds());
    this.startTimer(() => this.showResults());
  }

  showResults() {
    this.clearAllIntervals();
    this.gameState.set('results');
  }

  resetToWelcome() {
    this.clearAllIntervals();
    this.generateTable();
    this.gameState.set('welcome');
  }

  startTimer(onComplete) {
    this.clearAllIntervals();
    this.timerInterval = setInterval(() => {
      this.timer.update(t => t - 1);
      if (this.timer() <= 0) {
        this.clearAllIntervals();
        onComplete();
      }
    }, 1000);
  }

  handleCellClick(cell) {
    if (this.gameState() !== 'stage2' || cell.isFound) return;

    if (cell.value === this.targetNumber()) {
      cell.isFound = true; // Mutating is fine here as we'll trigger change detection via signals later
      this.targetNumber.update(n => n + 1);
      this.foundCount.update(c => c + 1);
      if (this.foundCount() === this.totalCells()) {
        this.showResults();
      }
    } else {
      this.wrongClickCell.set(cell.value);
      setTimeout(() => this.wrongClickCell.set(null), 400);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  updateStage1Duration(event) {
      const value = (event.target).value;
      this.stage1DurationMinutes.set(Number(value));
  }
  
  updateStage2Duration(event) {
      const value = (event.target).value;
      this.stage2DurationSeconds.set(Number(value));
  }
  
  updateTableSize(event) {
      const value = (event.target).value;
      this.tableSize.set(Number(value));
      this.generateTable();
  }
  
  clearAllIntervals() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.stage1TableRefreshInterval) {
      clearInterval(this.stage1TableRefreshInterval);
      this.stage1TableRefreshInterval = null;
    }
  }
}