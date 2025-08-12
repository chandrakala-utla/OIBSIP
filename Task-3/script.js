function convertTemperature() {
            console.log("Convert button clicked!");

            // Get input values
            const tempInput = document.getElementById('temperature');
            const temperature = parseFloat(tempInput.value);
            const fromUnit = document.querySelector('input[name="fromUnit"]:checked');
            const toUnit = document.querySelector('input[name="toUnit"]:checked');

            console.log("Temperature:", temperature);
            console.log("From unit:", fromUnit ? fromUnit.value : "none");
            console.log("To unit:", toUnit ? toUnit.value : "none");

            // Clear previous errors
            document.getElementById('errorMessage').style.display = 'none';

            // Validate input
            if (isNaN(temperature) || tempInput.value === '') {
                showError('Please enter a valid temperature number!');
                return;
            }

            if (!fromUnit || !toUnit) {
                showError('Please select both from and to units!');
                return;
            }

            if (fromUnit.value === toUnit.value) {
                showError('Please select different units for conversion!');
                return;
            }

            // Check absolute zero
            if ((fromUnit.value === 'celsius' && temperature < -273.15) ||
                (fromUnit.value === 'fahrenheit' && temperature < -459.67) ||
                (fromUnit.value === 'kelvin' && temperature < 0)) {
                showError('Temperature cannot be below absolute zero!');
                return;
            }

            // Perform conversion
            const result = performConversion(temperature, fromUnit.value, toUnit.value);

            console.log("Conversion result:", result);

            // Display result
            displayResult(result, toUnit.value, fromUnit.value);
        }

        function performConversion(temp, fromUnit, toUnit) {
            let celsius;

            // Convert to Celsius first
            switch (fromUnit) {
                case 'celsius':
                    celsius = temp;
                    break;
                case 'fahrenheit':
                    celsius = (temp - 32) * 5 / 9;
                    break;
                case 'kelvin':
                    celsius = temp - 273.15;
                    break;
            }

            // Convert from Celsius to target
            switch (toUnit) {
                case 'celsius':
                    return celsius;
                case 'fahrenheit':
                    return (celsius * 9 / 5) + 32;
                case 'kelvin':
                    return celsius + 273.15;
            }
        }

        function displayResult(result, toUnit, fromUnit) {
            console.log("Displaying result:", result, toUnit);

            const tempElement = document.getElementById('convertedTemp');
            const unitElement = document.getElementById('convertedUnit');
            const formulaElement = document.getElementById('formula');
            const formulaText = document.getElementById('formulaText');

            // Display temperature
            tempElement.textContent = result.toFixed(2);

            // Display unit
            let unitSymbol = '';
            switch (toUnit) {
                case 'celsius':
                    unitSymbol = '°C';
                    break;
                case 'fahrenheit':
                    unitSymbol = '°F';
                    break;
                case 'kelvin':
                    unitSymbol = 'K';
                    break;
            }
            unitElement.textContent = unitSymbol;

            // Show formula
            const formula = getFormula(fromUnit, toUnit);
            formulaText.textContent = formula;
            formulaElement.style.display = 'block';

            console.log("Result displayed:", tempElement.textContent, unitElement.textContent);
        }

        function getFormula(fromUnit, toUnit) {
            const formulas = {
                'celsius-fahrenheit': '°F = (°C × 9/5) + 32',
                'celsius-kelvin': 'K = °C + 273.15',
                'fahrenheit-celsius': '°C = (°F - 32) × 5/9',
                'fahrenheit-kelvin': 'K = (°F - 32) × 5/9 + 273.15',
                'kelvin-celsius': '°C = K - 273.15',
                'kelvin-fahrenheit': '°F = (K - 273.15) × 9/5 + 32'
            };
            return formulas[fromUnit + '-' + toUnit] || '';
        }

        function showError(message) {
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // Update button state when units change
        function updateButtonState() {
            const fromUnit = document.querySelector('input[name="fromUnit"]:checked');
            const toUnit = document.querySelector('input[name="toUnit"]:checked');
            const button = document.getElementById('convertBtn');

            if (fromUnit && toUnit && fromUnit.value === toUnit.value) {
                button.disabled = true;
                button.textContent = '⚠️ Select Different Units';
            } else {
                button.disabled = false;
                button.textContent = '🔄 Convert Temperature';
            }
        }

        // Add event listeners to radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', updateButtonState);
        });

        // Initialize
        updateButtonState();

        console.log("Temperature converter loaded successfully!");
