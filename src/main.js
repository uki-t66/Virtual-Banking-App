import './input.css'
let userBankAccount;

const config = {
    initialForm: document.querySelector("#initial-form"),
    bankPage: document.querySelector("#main-bank-page")
}

class BankAccount{

    constructor(firstName,lastName,email,type,accountNumber, money){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        this.accountNumber = accountNumber;
        this.money = money;
        this.initialDeposit = money;
    }

    getFullName(){
        return this.firstName + " " + this.lastName
    }

}

// min-max 間のランダムな整数を返す
const getRandomInteger = (min,max) => {
    let NumOfRandom = Math.floor(Math.random() * (max - min) + min);
    return NumOfRandom;
}

// index.htmlのinitial-formの"submit"がクリックされると入力されたデータに応じてオブジェクトを作成
const initializeUserAccount = () => {
    const form = document.querySelector("#initial-form");
    userBankAccount = new BankAccount(
        form.querySelector("#first-name").value,
        form.querySelector("#last-name").value,
        form.querySelector("#email").value,
        form.querySelector("input[name='userAccountType']:checked").value,
        getRandomInteger(1, Math.pow(10,8)),
        parseInt(form.querySelector("#deposit").value)
    );

    // ページを切り替え
    form.style.display = "none";
    updateAndShowMainBankPage();
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#initial-form");
    
    // フォームの送信イベントにリスナーを追加
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // デフォルトの送信動作を防ぐ
        initializeUserAccount();
    });
});

// main-bank-pageを表示
const mainBankPage = (bankAccount) => {
    // メインコンテナの作成
    const bankPage = document.createElement('div');
    bankPage.id = 'bank-page';
    
    bankPage.classList.add('grid', 'place-items-center', 'h-screen', 'bg-gray-700');

    // 内部コンテナの作成
    const innerContainer = document.createElement('div');
    innerContainer.classList.add('grid', 'border-gray-500', 'w-2/3', 'h-2/5', 'bg-[#4BA3A1]', 'px-6', 'py-4');

    // ユーザー情報セクションの作成
    const userInfoSection = document.createElement('div');
    userInfoSection.classList.add('text-white', 'flex', 'flex-col', 'items-end', 'space-y-1');

    const userInfoItems = [
        `Your Name: ${bankAccount.firstName} ${bankAccount.lastName}`,
        `Your Bank ID: ${bankAccount.accountNumber}`,
        `Your First Deposit: $${bankAccount.initialDeposit.toFixed(2)}`
    ];

    userInfoItems.forEach((item, index) => {
        const p = document.createElement('p');
        p.classList.add('text-xl');
        if (index === 0) p.classList.add('m-0', 'mt-1');
        p.textContent = item;
        userInfoSection.appendChild(p);
    });

    // 残高表示セクションの作成
    const balanceSection = document.createElement('div');
    balanceSection.classList.add('grid', 'grid-cols-2', 'grid-rows-[4rem]', 'items-center', 'text-white', 'bg-red-600', 'h-16', 'px-4');

    const balanceLabel = document.createElement('p');
    balanceLabel.classList.add('justify-self-start', 'self-center', 'text-3xl');
    balanceLabel.textContent = 'Available Balance';

    const balanceAmount = document.createElement('p');
    balanceAmount.classList.add('justify-self-end', 'self-center', 'text-3xl');
    balanceAmount.textContent = `$${bankAccount.money.toFixed(2)}`;

    balanceSection.appendChild(balanceLabel);
    balanceSection.appendChild(balanceAmount);

    // ボタンセクションの作成
    const buttonSection = document.createElement('div');
    buttonSection.classList.add('grid', 'grid-cols-3', 'gap-2');

    const buttons = [
        { text: 'WITHDRAWAL', icon: 'fa-wallet', onClick: showWithdrawPage },
        { text: 'DEPOSIT', icon: 'fa-coins', onClick: showDepositPage },
        { text: 'COME BACK LATER', icon: 'fa-house-chimney', onClick: showComeBackLaterPage }
    ];
    
    buttons.forEach((buttonInfo, index) => {
        const buttonContainer = document.createElement('button');
        buttonContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'bg-[#1A4567]', 'hover:bg-opacity-75', 'cursor-pointer');
        if (buttonInfo.onClick) {
            buttonContainer.addEventListener('click', buttonInfo.onClick);
        }
    
        const button = document.createElement('div');
        button.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'gap-3');
    
        const span = document.createElement('span');
        span.classList.add('text-2xl', 'text-white');
        span.textContent = buttonInfo.text;
    
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', buttonInfo.icon, 'text-4xl', 'text-white');
    
        button.appendChild(span);
        button.appendChild(icon);
        buttonContainer.appendChild(button);
        buttonSection.appendChild(buttonContainer);
    });

    // 全ての要素を組み立てる
    innerContainer.appendChild(userInfoSection);
    innerContainer.appendChild(balanceSection);
    innerContainer.appendChild(buttonSection);
    bankPage.appendChild(innerContainer);

    return bankPage;
};

const updateAndShowMainBankPage = () => {
    const mainBankPageElement = document.getElementById('main-bank-page');
    const confirmationPage = document.getElementById('confirmation-page');
    const withdrawPage = document.getElementById('withdraw-page');

    // 他のページを非表示にする
    if (confirmationPage) confirmationPage.style.display = 'none';
    if (withdrawPage) withdrawPage.style.display = 'none';

    // メインバンクページの内容を更新
    mainBankPageElement.innerHTML = '';
    mainBankPageElement.appendChild(mainBankPage(userBankAccount));
    mainBankPageElement.style.display = 'block';
};

const showWithdrawPage = () => {
    // メインバンクページを非表示にする
    const mainBankPage = document.getElementById('main-bank-page');
    mainBankPage.style.display = 'none';

    // Withdrawページを表示する
    const withdrawPage = document.getElementById('withdraw-page');
    withdrawPage.innerHTML = ''; // 既存のコンテンツをクリア

    const withdrawContent = `
        <div id="withdraw" class="bg-gray-700 h-screen w-screen flex justify-center items-center">
            <div class="container grid grid-cols-1 space-y-6 bg-white w-1/2 h-2/3 p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-3xl">Please Enter The Withdrawal Amount</h2>
                </div>
                <div class="container w-full grid grid-cols-10 gap-4">
                    ${[100, 50, 20, 10, 5, 1].map(value => `
                        <label for="${value}" class="flex items-center justify-center col-span-2 text-xl">$${value}</label>
                        <input type="number" id="${value}" class="border border-black col-span-8 p-2" min="0" value="0">
                    `).join('')}
                </div>
                <div class="container flex items-center justify-center bg-[#1A4567]">
                    <p id="total-amount" class="text-white">$0.00</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Next</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    withdrawPage.innerHTML = withdrawContent;
    withdrawPage.style.display = 'block';

    // トータル金額を計算し、表示を更新する関数
    const updateTotal = () => {
        const total = [100, 50, 20, 10, 5, 1].reduce((sum, value) => {
            const input = document.getElementById(value.toString());
            return sum + (parseInt(input.value) || 0) * value;
        }, 0);
        document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
    };

    // 各入力フィールドにイベントリスナーを追加
    [100, 50, 20, 10, 5, 1].forEach(value => {
        const input = document.getElementById(value.toString());
        input.addEventListener('input', updateTotal);
    });

    // Go Backボタンのイベントリスナーを追加
    const goBackButton = withdrawPage.querySelector('a:first-of-type');
    goBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        withdrawPage.style.display = 'none';
        mainBankPage.style.display = 'block';
    });

    // Nextボタンのイベントリスナーを追加（必要に応じて実装）
    const nextButton = withdrawPage.querySelector('a:last-of-type');
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        const withdrawalData = [100, 50, 20, 10, 5, 1].map(value => ({
            denomination: value,
            count: parseInt(document.getElementById(value.toString()).value) || 0
        }));
        showConfirmationPage(withdrawalData);
    });
};

const showConfirmationPage = (withdrawalData) => {
    const withdrawPage = document.getElementById('withdraw-page');
    withdrawPage.style.display = 'none';

    const confirmationPage = document.getElementById('confirmation-page');
    confirmationPage.innerHTML = ''; // 既存のコンテンツをクリア

    const total = withdrawalData.reduce((sum, item) => sum + item.denomination * item.count, 0);

    const confirmationContent = `
        <div class="h-screen w-screen flex justify-center items-center bg-gray-700">
            <div class="container grid grid-cols-1 space-y-6 bg-white w-1/2 h-2/3 p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">The money you are going to take is …</h2>
                </div>
                <div class="container flex flex-col justify-between bg-[#1A4567] mx-auto w-2/3 p-2">
                    ${withdrawalData.map(item => item.count > 0 ? 
                        `<p class="text-2xl flex justify-end border-2 border-white text-white p-2">${item.count} x $${item.denomination}</p>` : 
                        '').join('')}
                    <p class="text-2xl flex justify-end text-white p-2">total: $${total.toFixed(2)}</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    confirmationPage.innerHTML = confirmationContent;
    confirmationPage.style.display = 'block';

    // Go Backボタンのイベントリスナーを追加
    const goBackButton = confirmationPage.querySelector('a:first-of-type');
    goBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        confirmationPage.style.display = 'none';
        showWithdrawPage(); // Withdraw画面に戻る
    });

    // Confirmボタンのイベントリスナーを更新
    const confirmButton = confirmationPage.querySelector('a:last-of-type');
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();
        const totalWithdrawal = withdrawalData.reduce((sum, item) => sum + item.denomination * item.count, 0);
        
        // 残高を更新
        userBankAccount.money -= totalWithdrawal;

        // メインバンクページを更新して表示
        updateAndShowMainBankPage();
    });
};

const showDepositPage = () => {
    // メインバンクページを非表示にする
    const mainBankPage = document.getElementById('main-bank-page');
    mainBankPage.style.display = 'none';

    // Depositページを表示する
    const depositPage = document.getElementById('deposit-page');
    depositPage.innerHTML = ''; // 既存のコンテンツをクリア

    const depositContent = `
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center ">
                    <h2 class="text-4xl">Please Enter The Deposit Amount</h2>
                </div>
                <div>
                    <input type="text" id="deposit-amount" placeholder="$0" class="border-2 border-gray-300 w-full p-2">
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    depositPage.innerHTML = depositContent;
    depositPage.style.display = 'block';

    // Go Backボタンのイベントリスナーを追加
    const goBackButton = depositPage.querySelector('a:first-of-type');
    goBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        depositPage.style.display = 'none';
        mainBankPage.style.display = 'block';
    });

    // Confirmボタンのイベントリスナーを追加
    const confirmButton = depositPage.querySelector('a:last-of-type');
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();
        const depositAmount = parseFloat(document.getElementById('deposit-amount').value.replace('$', ''));
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }
        showDepositConfirmationPage(depositAmount);
    });
};

const showDepositConfirmationPage = (depositAmount) => {
    const depositPage = document.getElementById('deposit-page');
    depositPage.style.display = 'none';

    const confirmationPage = document.getElementById('deposit-confirmation-page');
    confirmationPage.innerHTML = ''; // 既存のコンテンツをクリア

    const confirmationContent = `
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">Confirm Your Deposit</h2>
                </div>
                <div class="container flex flex-col justify-between bg-[#1A4567] mx-auto w-2/3 p-4">
                    <p class="text-2xl text-white text-center">You are about to deposit:</p>
                    <p class="text-3xl text-white text-center font-bold">$${depositAmount.toFixed(2)}</p>
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    confirmationPage.innerHTML = confirmationContent;
    confirmationPage.style.display = 'block';

    // Go Backボタンのイベントリスナーを追加
    const goBackButton = confirmationPage.querySelector('a:first-of-type');
    goBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        confirmationPage.style.display = 'none';
        showDepositPage(); // 入金ページに戻る
    });

    // Confirmボタンのイベントリスナーを追加
    const confirmButton = confirmationPage.querySelector('a:last-of-type');
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();
        userBankAccount.money += depositAmount;
        updateAndShowMainBankPage();
    });
};

const showComeBackLaterPage = () => {
    const mainBankPage = document.getElementById('main-bank-page');
    mainBankPage.style.display = 'none';

    const comeBackLaterPage = document.getElementById('come-back-later-page');
    comeBackLaterPage.innerHTML = ''; // 既存のコンテンツをクリア

    const content = `
        <div class="h-screen w-screen flex items-center justify-center bg-gray-700">
            <div class="container grid grid-cols-1 gap-4 w-2/3 bg-white p-6">
                <div class="container flex justify-center items-center">
                    <h2 class="text-4xl">Come Back Later</h2>
                </div>
                <div>
                    <label for="days-away" class="block text-sm font-medium text-gray-700">Number of days to come back later:</label>
                    <input type="number" id="days-away" min="1" class="mt-1 block w-full border-2 border-gray-300 p-2" placeholder="Enter number of days">
                </div>
                <div class="container flex items-center justify-center">
                    <a href="#" class="flex items-center justify-center border border-blue-800 text-blue-600 w-1/2 h-2/3 p-4 mr-4 rounded font-bold hover:text-white hover:bg-blue-600 hover:transition duration-300 ease-in-out">
                        <button>Go Back</button>
                    </a>
                    <a href="#" class="flex items-center justify-center border border-blue-800 bg-blue-600 w-1/2 h-2/3 p-4 rounded font-bold text-white hover:bg-opacity-75 hover:transition duration-300 ease-in-out">
                        <button>Confirm</button>
                    </a>
                </div>
            </div>
        </div>
    `;

    comeBackLaterPage.innerHTML = content;
    comeBackLaterPage.style.display = 'block';

    // Go Backボタンのイベントリスナーを追加
    const goBackButton = comeBackLaterPage.querySelector('a:first-of-type');
    goBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        comeBackLaterPage.style.display = 'none';
        mainBankPage.style.display = 'block';
    });

    // Confirmボタンのイベントリスナーを追加
    const confirmButton = comeBackLaterPage.querySelector('a:last-of-type');
    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();
        const daysAway = parseInt(document.getElementById('days-away').value);
        if (isNaN(daysAway) || daysAway <= 0) {
            alert('Please enter a valid number of days.');
            return;
        }
        calculateInterest(daysAway);
    });
};

const calculateInterest = (days) => {
    const annualInterestRate = 0.10; // 10% annual interest rate
    const dailyInterestRate = annualInterestRate / 365;
    const interestEarned = userBankAccount.money * dailyInterestRate * days;
    const newBalance = userBankAccount.money + interestEarned;

    userBankAccount.money = newBalance;

    alert(`You've earned $${interestEarned.toFixed(2)} in interest. Your new balance is $${newBalance.toFixed(2)}.`);
    updateAndShowMainBankPage();
};